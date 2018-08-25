import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Container, Left, Body, Right, Title, Card, Icon } from 'native-base';
import { Header } from 'react-native-elements';
import Post from './Post';

export default class PostsList extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            location={item.location}
            description={item.description}
            poster={item.name}
            date={item.date}
            email={item.email}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}
