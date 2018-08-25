import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";

export default class ProfileImage extends React.Component {
  render(props) {
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          containerStyle={styles.avatar}
          xlarge
          rounded
          source={{
            uri:
              "file:///Users/gitaritirima/Downloads/Motorbike%20Helmet-595b40b75ba036ed117d67e3.svg"
          }}
          onPress={this.props.changeProfilePhoto}
          activeOpacity={0.7}
        />
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.nameText}> {this.props.name}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "#4286f4",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  contentContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: { backgroundColor: "#4286f4" },
  headerText: { color: "#fff" },
  nameText: { color: "#fff", fontSize: 20 },
  locationText: { color: "#fff", fontSize: 14 },
  industryText: { color: "#fff", fontSize: 12 },
  avatar: {
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.4
  }
});
