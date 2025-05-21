import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PetsProvider } from './src/contexts/PetContext';
import Login from './src/pages/login';
import Register from './src/pages/register';
import Home from './src/pages/home';
import AddPet from './src/pages/addPet'
import PetProfile from './src/pages/petProfile';
import AddAncestry from './src/pages/addAncestry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PetsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPet"
            component={AddPet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PetProfile"
            component={PetProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddAncestry"
            component={AddAncestry}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PetsProvider>
  );
}
