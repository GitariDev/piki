import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  Container,
  Left,
  Body,
  Right,
  Title,
  Card,
  Icon,
  Spinner
} from 'native-base';
import { Header } from 'react-native-elements';
import AddButton from '../../components/common/AddButton';
import PostsList from '../../components/PostsList';
import firebase from 'firebase';
import RefreshButton from '../../components/common/RefreshButton';
export default class ViewPosts extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    loading: false,
    posts: []
  };
  componentDidMount = async () => {
    await this.setState({ loading: true, posts: [] });
    await firebase
      .database()
      .ref('/posts/')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var child = childSnapshot.val();

          this.setState(prevState => ({
            posts: [...prevState.posts, child]
          }));
        });
      });
    this.setState({ loading: false });
  };

  _swichScreen = () => {
    this.props.navigation.navigate('Add');
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#4286f4' }}>
        <Header
          leftComponent={
            <RefreshButton
              onPress={() => {
                this.componentDidMount();
              }}
            />
          }
          centerComponent={{ text: 'Posts', style: { color: '#fff' } }}
          rightComponent={
            <AddButton
              onPress={() => {
                this._swichScreen();
              }}
            />
          }
        />
        {this.state.loading === true ? <Spinner color="#fff" /> : <View />}
        <PostsList data={this.state.posts} />
      </Container>
    );
  }
}
