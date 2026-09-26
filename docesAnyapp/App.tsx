import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './src/database/database';
import Home from './src/screens/Home';
import Menu from './src/screens/Menu';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SQLiteProvider
      databaseName="docesAnyapp.db"
      onInit={initializeDatabase}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Doces da Any App'
          }}
          />

          <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            title: 'Cardápio'
          }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}