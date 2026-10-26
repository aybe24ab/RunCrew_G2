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
  const [activities, setActivities] = useState([]);

  // Hent tilmeldte aktiviteter, hver gang skærmen åbnes
  useFocusEffect(
    useCallback(() => {
      const loadActivities = async () => {
        try {
          const savedActivities = await AsyncStorage.getItem('myActivities');

          const parsedActivities = savedActivities
            ? JSON.parse(savedActivities)
            : [];

          setActivities(parsedActivities);
        } catch (error) {
          console.log('Fejl ved hentning:', error);
          Alert.alert('Fejl', 'Kunne ikke hente dine aktiviteter.');
        }
      };

      loadActivities();
    }, [])
  );

  // Fjern en aktivitet fra brugerens tilmeldinger
  const removeActivity = async (id) => {
    try {
      const updatedActivities = activities.filter(
        (activity) => activity.id !== id
      );

      await AsyncStorage.setItem(
        'myActivities',
        JSON.stringify(updatedActivities)
      );

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

      {activities.length === 0 ? (
        <Text style={styles.subtitle}>
          Du har endnu ikke tilmeldt dig nogen aktiviteter.
        </Text>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>Tempo: {item.pace}</Text>
              <Text style={styles.text}>Tidspunkt: {item.time}</Text>

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