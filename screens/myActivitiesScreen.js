import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles';

export default function MyActivitiesScreen({ navigation }) {

  // Gemmer listen over aktiviteter, som brugeren er tilmeldt
  const [activities, setActivities] = useState([]);

  // Henter tilmeldte aktiviteter, hver gang skærmen åbnes
  useFocusEffect(
    useCallback(() => {
      const loadActivities = async () => {
        try {
          // Henter tidligere gemte aktiviteter fra telefonens lokale lager
          const savedActivities = await AsyncStorage.getItem('myActivities');

          // Omdanner de gemte data til en liste
          const parsedActivities = savedActivities
            ? JSON.parse(savedActivities)
            : [];

          // Opdaterer listen, som vises på skærmen
          setActivities(parsedActivities);
        } catch (error) {
          console.log('Fejl ved hentning:', error);
          Alert.alert('Fejl', 'Kunne ikke hente dine aktiviteter.');
        }
      };

      loadActivities();
    }, [])
  );

  // Fjerner en aktivitet fra brugerens tilmeldinger
  const removeActivity = async (id) => {
    try {
      // Finder alle aktiviteter undtagen den, brugeren vil afmelde
      const updatedActivities = activities.filter(
        (activity) => activity.id !== id
      );

      // Gemmer den opdaterede liste i AsyncStorage
      await AsyncStorage.setItem(
        'myActivities',
        JSON.stringify(updatedActivities)
      );

      // Opdaterer skærmen, så den afmeldte aktivitet forsvinder
      setActivities(updatedActivities);

      Alert.alert('Afmeldt', 'Aktiviteten er fjernet.');
    } catch (error) {
      console.log('Fejl ved afmelding:', error);
      Alert.alert('Fejl', 'Kunne ikke fjerne aktiviteten.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine aktiviteter</Text>

      {/* Viser en besked, hvis brugeren ikke har tilmeldt sig noget */}
      {activities.length === 0 ? (
        <Text style={styles.subtitle}>
          Du har endnu ikke tilmeldt dig nogen aktiviteter.
        </Text>
      ) : (

        // Viser brugerens tilmeldte aktiviteter som en liste
        <FlatList
          data={activities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>Tempo: {item.pace}</Text>
              <Text style={styles.text}>Tidspunkt: {item.time}</Text>

              {/* Knappen giver brugeren mulighed for at afmelde aktiviteten */}
              <Button
                title="Afmeld aktivitet"
                onPress={() => removeActivity(item.id)}
                color="#1B4332"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}