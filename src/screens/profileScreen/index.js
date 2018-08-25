import React from "react";
import { LayoutAnimation, ScrollView, View } from "react-native";
import { Button, Header } from "react-native-elements";
import firebase from "firebase";
import { Container, Spinner } from "native-base";
import ProfileInputs from "./ProfileInputs";
import ProfileImage from "./ProfileImage";

export default class ProfileScreen extends React.Component {
  state = {
    photoUrl: "",
    name: "",
    email: "",
    bike: "",
    loading: false,
    pLoad: false
  };

  componentDidMount = async () => {
    await this.setState({ pLoad: true });
    var user = firebase.auth().currentUser;
    await firebase
      .database()
      .ref("users/" + user.uid)
      .once("value")
      .then(snapshot => {
        var name = snapshot.val().name;
        var email = snapshot.val().email;
        var bike = snapshot.val().bike;

        this.setState({
          name: name,
          email: email,
          bike: bike
        });
        this.setState({ pLoad: false });
      });
  };

  componentWillUpdate = () => {
    LayoutAnimation.spring();
  };
  saveInfo = async () => {
    await this.setState({ loading: true });
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    await firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        name: this.state.name,
        email: this.state.email,
        bike: this.state.bike
      });
    this.setState({ loading: false });
  };
  componentWillMount = () => {};
  changeText = (text, label) => {
    this.setState({ [label]: text });
    console.log(this.state);
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#4286f4" }}>
        <Header
          centerComponent={{ text: "Profile", style: { color: "#fff" } }}
        />
        <ScrollView>
          <ProfileImage user={this.state.name} />
          {this.state.pLoad === true ? <Spinner color="white" /> : <View />}
          <ProfileInputs
            name={this.state.name}
            email={this.state.email}
            bike={this.state.bike}
            onChangeText={(text, label) => {
              this.changeText(text, label);
            }}
            onSavePress={() => {
              this.saveInfo();
            }}
            loading={this.state.loading}
          />
          <Button title="log out" onPress={() => firebase.auth().signOut()} />
        </ScrollView>
      </Container>
    );
  }
}
