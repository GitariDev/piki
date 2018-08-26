import React from "react";
import { View } from "react-native";
import axios from "axios";
import { Constants, Location, Permissions } from "expo";
import { WeatherWidget } from "react-native-weather";

export default class WeatherBar extends Component {
  state = {
    lat: "-1.28333",
    lng: "36.81667",
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
  _onLoad = () => {};
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

    const weather = await axios.get(
      `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}`
    );

    var data = weather.data;
    console.log(data);
    this.setState({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather.main,
      intCondition: data.weather.descripton,
      clouds: data.clouds.all
    });
  };

  render() {
    return <View />;
  }
}
