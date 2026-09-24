import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SQLiteProvider } from 'expo-sqlite';

import { initializeDatabase } from './src/database/database';
import Products from './src/screens/Products';
import RegisterProduct from './src/screens/RegisterProduct';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SQLiteProvider
      databaseName="techstore.db"
      onInit={initializeDatabase}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Products" 
            component={Products} 
            options={{ 
              title: 'TechStore' 
            }}
          />
          
          <Stack.Screen 
            name="RegisterProduct"
            component={RegisterProduct} 
            options={{ 
              title: 'Cadastrar Produto' 
            }}
          />
        
          </Stack.Navigator>
      </NavigationContainer>

    </SQLiteProvider>
  );
}