import React from "react";
import { Text, View, LayoutAnimation } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { Permissions, Location } from "expo";
import {
  Container,
  Left,
  Body,
  Right,
  Title,
  Card,
  Icon,
  CardSection,
  Input,
  Form,
  Item,
  Label
} from "native-base";
import { Header, Button } from "react-native-elements";
import BackButton from "../../components/common/BackButton";
import firebase from "firebase";
import axios from "axios";
export default class AddPost extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    title: "",
    location: "",
    description: "",
    loading: false,
    message: "",
    date: ""
  };
  componentDidMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      await alert(
        "Hey! You might want to enable Location so that you can post"
      );
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        this.setState({
          errorMessage: "Permission to access location was denied"
        });
      } else {
        alert("thank you, now refresh the map!");
      }
    } else {
      this._getLocation();
    }
  };
  _getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    var coords = location.coords;
    var lat = coords.latitude;
    var long = coords.longitude;
    await this.setState({
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      }
    });

    console.log(this.state);
    const l = await axios.get(
      `http://maps.googleapis.com/maps/api/geocode/json?latlng=${
        coords.latitude
      },${coords.longitude}`
    );
    let place = l.data.results[0].formatted_address;

    this.setState({ location: place });
  };
  componentWillUpdate = () => {
    LayoutAnimation.spring();
  };
  _switchScreen = () => {
    this.props.navigation.navigate("View");
  };

  _changeText = (text, label) => {
    this.setState({ [label]: text });
  };

  _createPost = async () => {
    await this.setState({ loading: true });
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    var date = new Date();
    var postId = Math.random()
      .toString(36)
      .substr(2, 9);
    await firebase
      .database()
      .ref("posts/" + postId)
      .set({
        title: this.state.title,
        location: this.state.location,
        description: this.state.description,
        poster: user.uid,
        email: user.email,
        date: date,
        id: postId,
        latitude: this.state.coords.latitude,
        longitude: this.state.coords.longitude
      });
    this.setState({ loading: false, message: "Post success" });
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#4286f4" }}>
        <Header
          centerComponent={{ text: "Add Post", style: { color: "#fff" } }}
          leftComponent={
            <BackButton
              onPress={() => {
                this._switchScreen();
              }}
            />
          }
        />
        <Card>
          <Form>
            <Item floatingLabel>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={text => {
                  this._changeText(text, "title");
                }}
              />
            </Item>
            {/* <Item>
              <Label>Location</Label>
              <Input
                value={this.state.location}
                onChangeText={text => {
                  this._changeText(text, 'location');
                }}
              />
            
            </Item> */}
            <Item floatingLabel last>
              <Label>Description</Label>
              <Input
                value={this.state.description}
                onChangeText={text => {
                  this._changeText(text, "description");
                }}
              />
            </Item>
          </Form>
          <Text>Your Location: {this.state.location} </Text>

          <Text>{this.state.message}</Text>
          <View style={{ padding: 10 }}>
            <Button
              backgroundColor="blue"
              title="post"
              onPress={this._createPost}
              loading={this.state.loading}
            />
          </View>
        </Card>
      </Container>
    );
  }
}
