import React from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { Constants, Location, Permissions } from "expo";

export default class WeatherBar extends React.Component {
  state = {
    lat: "",
    lng: "",
    location: "",
    temp: "",
    city: "",
    condition: "",
    intCondition: "",
    coulds: ""
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    var lat = location.coords.latitude;
    var lng = location.coords.longitude;
    this.setState({ location: location, lat: lat, lng: lng });
    console.log(this.state.lat);

    const weather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=12b366b63ddb6c126faff9de470b8e27`
    );

    var data = weather.data;
    console.log(data);
    this.setState({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      intCondition: data.weather[0].description,
      clouds: data.clouds.all
    });
  };

  render() {
    return (
      <View>
        <Text>City: {this.state.city}</Text>
        <Text>Current Temp: {this.state.temp - 273.15} C</Text>
        <Text>Description: {this.state.condition}</Text>
        <Text>{this.state.intCondition}</Text>
        <Text>Clouds are at: {this.state.clouds} %</Text>
      </View>
    );
  }
}
