import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile screen here. </Text>
        <Button title="log out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
