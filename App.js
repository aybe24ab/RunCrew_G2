import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importerer de fire skærme, som bruges i RunCrew
import HomeScreen from './screens/HomeScreen';
import RunsScreen from './screens/RunsScreen';
import RunDetailsScreen from './screens/RunDetailsScreen';
import MyActivitiesScreen from './screens/myActivitiesScreen';

// Opretter en stack navigator til navigation mellem skærmene
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer håndterer navigationen i appen
    <NavigationContainer>
      {/* Home er den første skærm, der vises, når appen åbnes */}
      <Stack.Navigator initialRouteName="Home">

        {/* Forsiden af RunCrew */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'RunCrew' }}
        />

        {/* Viser listen over løbe- og gåaktiviteter */}
        <Stack.Screen
          name="Runs"
          component={RunsScreen}
          options={{ title: 'Aktiviteter' }}
        />

        {/* Viser detaljer om en valgt aktivitet */}
        <Stack.Screen
          name="RunDetails"
          component={RunDetailsScreen}
          options={{ title: 'Aktivitet' }}
        />

        {/* Viser de aktiviteter, som brugeren har tilmeldt sig */}
        <Stack.Screen
          name="MyActivities"
          component={MyActivitiesScreen}
          options={{ title: 'Mine aktiviteter' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}