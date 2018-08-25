import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Left, Body, Right, Title, Card, Icon } from 'native-base';
import { Header } from 'react-native-elements';

export default class AddButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon name="add" style={{ color: '#fff', paddingTop: 15 }} />
        </TouchableOpacity>
      </View>
    );
  }
}
