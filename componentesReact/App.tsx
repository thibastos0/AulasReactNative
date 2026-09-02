import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as screens from './screens/';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: screens.HomeScreen,
      options: {title: 'Bem-Vindo'},
    },
    App_antigo: {
      screen: screens.App_antigo,
    },
    Profile: {
      screen: screens.ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}