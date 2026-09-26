import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './src/database/database';
import Home from './src/screens/Home';
import Menu from './src/screens/Menu';
import AddMenuItem from './src/screens/AddMenuItem';
import EditMenuItem from './src/screens/EditMenuItem';
import Details from './src/screens/Details';

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

          <Stack.Screen
          name="AddMenuItem"
          component={AddMenuItem}
          options={{
            title: 'Adicionar Item'
          }}
          />

          <Stack.Screen
          name="EditMenuItem"
          component={EditMenuItem}
          options={{
            title: 'Editar Item'
          }}
          />

          <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Detalhes do Item'
          }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}