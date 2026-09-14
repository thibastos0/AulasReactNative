import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Produtos from './screens/Produtos';
import Detalhes from './screens/Detalhes';

const Stack = createNativeStackNavigator();

export default function App() {

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="Home"
      component={Home}
      />

      <Stack.Screen
      name="Produtos"
      component={Produtos}
      />

      <Stack.Screen
      name="Detalhes"
      component={Detalhes}
      />

    </Stack.Navigator>
  </NavigationContainer>;
}