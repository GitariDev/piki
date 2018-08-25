import { createBottomTabNavigator } from "react-navigation";

import HomeScreen from "./screens/homeScreen";
import MapScreen from "./screens/mapScreen";
import ProfileScreen from "./screens/profileScreen";

const Nav = createBottomTabNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  Profile: ProfileScreen
});

export default Nav;
