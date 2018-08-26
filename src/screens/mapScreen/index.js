
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { MapView, Permissions, Location } from 'expo';
import { Marker, MarkerAnimated } from 'react-native-maps';
import firebase from 'firebase';
import { Container } from 'native-base';
import { Header } from 'react-native-elements';
import RefreshButton from '../../components/common/RefreshButton';
import WeatherBar from '../../components/WeatherBar';


export default class MapScreen extends React.Component {
  state = {
    location: {
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
      latitude: 1.2921,
      longitude: 36.8219
    },

    markers: []
  };
  componentDidMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert('Hey! You might want to enable Location for this map');
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied'
        });
      } else {
        alert('thank you, now refresh the map!');
      }
    } else {
      this._getLocation();
    }
  };

  _getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    var coords = location.coords;
    var lat = coords.latitude;
    var long = coords.longitude;
    await this.setState({
      location: {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
      }
    });
    await firebase
      .database()
      .ref('/posts/')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var child = childSnapshot.val();

          this.setState(prevState => ({
            markers: [...prevState.markers, child]
          }));
        });
      });
    console.log(this.state.markers);
    console.log(coords);
  };
  onRegionChange(region) {
    var coords = region.coords;
    this.setState({
      location: {
        coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
    console.log(this.state.location);
  }

  render() {
    return (
      <Container>
        <Header
          leftComponent={
            <RefreshButton
              onPress={() => {
                this._getLocation();
              }}
            />
          }
          centerComponent={{ text: 'Map', color: '#fff' }}
        />
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.state.location}
          onRegionChange={() => {
            this.onRegionChange;
          }}
        >
          {this.state.markers !== [] ? (
            this.state.markers.map(marker => (
              <Marker
                key={marker.latitude}
                coordinate={marker}
                title={marker.title + ' posted by: ' + marker.email}
                description={marker.description}
              />
            ))
          ) : (
            <View />
          )}
        </MapView>
        <WeatherBar />
      </Container>
    );
  }
}
