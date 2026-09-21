import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import RunsScreen from './screens/RunsScreen';
import RunDetailsScreen from './screens/RunDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'RunCrew' }}
        />

        <Stack.Screen
          name="Runs"
          component={RunsScreen}
          options={{ title: 'Aktiviteter' }}
        />

        <Stack.Screen
          name="RunDetails"
          component={RunDetailsScreen}
          options={{ title: 'Aktivitet' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}