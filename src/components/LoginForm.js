import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";
import { Button, Card, CardSection, Input, Spinner } from "./common";
import { Header } from "react-native-elements";

class LoginForm extends Component {
  state = { email: "", password: "", error: "", loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.onLoginSuccess.bind(this);
            this.saveInfo();
          })
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: "Authentication Failed", loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
  }
  saveInfo = async () => {
    var user = firebase.auth().currentUser;
    var database = firebase.database();
    await firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        name: "",
        email: "",
        bike: ""
      });
  };
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }

  render() {
    return (
      <View>
        <Header centerComponent={{ text: "Login", style: { color: "#fff" } }} />
        <Card>
          <CardSection>
            <Input
              placeholder="user@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

export default LoginForm;
