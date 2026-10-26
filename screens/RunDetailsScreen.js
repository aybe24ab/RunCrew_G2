import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

export default function RunDetailsScreen({ route }) {
  const { run } = route.params;

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hent tidligere tilmeldinger, når skærmen åbnes
  useEffect(() => {
    const loadParticipation = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem('myActivities');

        const activities = savedActivities
          ? JSON.parse(savedActivities)
          : [];

        const isJoined = activities.some(
          (activity) => activity.id === run.id
        );

        setJoined(isJoined);
      } catch (error) {
        console.log('Fejl ved hentning af aktiviteter:', error);
        Alert.alert('Fejl', 'Kunne ikke hente dine tilmeldinger.');
      } finally {
        setLoading(false);
      }
    };

    loadParticipation();
  }, [run.id]);

  // Tilmeld eller afmeld en aktivitet
  const handleParticipation = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const savedActivities = await AsyncStorage.getItem('myActivities');

      let activities = savedActivities
        ? JSON.parse(savedActivities)
        : [];

      const isAlreadyJoined = activities.some(
        (activity) => activity.id === run.id
      );

      if (isAlreadyJoined) {
        // Fjern aktiviteten fra brugerens tilmeldinger
        activities = activities.filter(
          (activity) => activity.id !== run.id
        );

        await AsyncStorage.setItem(
          'myActivities',
          JSON.stringify(activities)
        );

        setJoined(false);

        Alert.alert(
          'Afmeldt',
          'Du har afmeldt aktiviteten.'
        );
      } else {
        // Gem aktiviteten i brugerens tilmeldinger
        activities.push(run);

        await AsyncStorage.setItem(
          'myActivities',
          JSON.stringify(activities)
        );

        setJoined(true);

        Alert.alert(
          'Tilmeldt',
          'Du er nu tilmeldt aktiviteten!'
        );
      }
    } catch (error) {
      console.log('Fejl ved gemning af aktivitet:', error);

      Alert.alert(
        'Fejl',
        'Der opstod en fejl. Prøv igen.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{run.title}</Text>

      <View style={styles.card}>

        <Text style={styles.text}>
          Aktivitet: {run.type}
        </Text>

        <Text style={styles.text}>
          Tempo: {run.pace}
        </Text>

        <Text style={styles.text}>
          Tidspunkt: {run.time}
        </Text>

        <Button
          title={
            loading
              ? 'Indlæser...'
              : joined
                ? 'Afmeld aktivitet'
                : 'Deltag'
          }
          onPress={handleParticipation}
          disabled={loading}
          color="#1B4332"
        />

      </View>

    </View>
  );
}