import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
export default class Post extends Component {
  render() {
    return (
      <Content>
        <Card>
          <CardItem>
            <View style={{ padding: 10 }}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text style={styles.location}>{this.props.location}</Text>
            </View>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{this.props.description}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Posted by: </Text>
            <Text style={styles.bold}>{this.props.email} </Text>
            <Text style={styles.bold}>{this.props.date}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  location: {
    fontSize: 13,
    fontStyle: "italic"
  },
  bold: {
    fontWeight: "bold"
  }
});
