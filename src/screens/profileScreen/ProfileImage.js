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
              "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjg0ZWm6ofdAhUSQRoKHZqiCeUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.materialui.co%2Ficon%2Fperson&psig=AOvVaw1r5MBHAZnHLT8p2VbWbJgC&ust=1535273677317487"
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
