import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-elements";

export default class ProfileImage extends React.Component {
  render() {
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          containerStyle={styles.avatar}
          xlarge
          rounded
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/piki-partner.appspot.com/o/Motorbike%20Helmet-595b40b75ba036ed117d67e3.svg?alt=media&token=72689730-edf5-422e-a28a-fc1ef78b8036"
          }}
          activeOpacity={0.7}
        />
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
