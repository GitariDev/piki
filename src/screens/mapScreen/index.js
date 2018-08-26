import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { WeatherBar } from "../../components/WeatherBar";

export default class MapScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>The map will be here somehow.... somehow</Text>
      </View>
    );
  }
}
