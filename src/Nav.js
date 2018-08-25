import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './screens/homeScreen';
import MapScreen from './screens/mapScreen';
import ProfileScreen from './screens/profileScreen';

const Nav = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Profile: ProfileScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Map') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray'
    }
  }
);

export default Nav;
