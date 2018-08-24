import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC43t2UT4IxUZwmJRwgg6GbIZKNRJ_FEoQ',
      authDomain: 'piki-partner.firebaseapp.com',
      databaseURL: 'https://piki-partner.firebaseio.com',
      projectId: 'piki-partner',
      storageBucket: 'piki-partner.appspot.com',
      messagingSenderId: '305290995933'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Auth Bruh" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
