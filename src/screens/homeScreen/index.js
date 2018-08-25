import ViewPosts from './ViewPosts';
import AddPost from './AddPost';
import { createStackNavigator } from 'react-navigation';

const HomeScreen = createStackNavigator({
  View: ViewPosts,
  Add: AddPost
});

export default HomeScreen;
