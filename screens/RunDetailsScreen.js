import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

export default function RunDetailsScreen({ route }) {
  // Henter den aktivitet, som brugeren har valgt på aktivitetslisten
  const { run } = route.params;

  // Holder styr på, om brugeren er tilmeldt, og om data indlæses
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // Henter tidligere tilmeldinger fra AsyncStorage, når skærmen åbnes
  useEffect(() => {
    const loadParticipation = async () => {
      try {
        const savedActivities = await AsyncStorage.getItem('myActivities');

        // Omdanner gemte data til en liste over aktiviteter
        const activities = savedActivities
          ? JSON.parse(savedActivities)
          : [];

        // Kontrollerer, om den valgte aktivitet allerede er tilmeldt
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

  // Håndterer tilmelding og afmelding af en aktivitet
  const handleParticipation = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Henter brugerens eksisterende tilmeldinger
      const savedActivities = await AsyncStorage.getItem('myActivities');

      let activities = savedActivities
        ? JSON.parse(savedActivities)
        : [];

      const isAlreadyJoined = activities.some(
        (activity) => activity.id === run.id
      );

      if (isAlreadyJoined) {
        // Fjerner aktiviteten fra brugerens tilmeldinger
        activities = activities.filter(
          (activity) => activity.id !== run.id
        );

        // Gemmer den opdaterede liste i AsyncStorage
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
        // Tilføjer den valgte aktivitet til brugerens tilmeldinger
        activities.push(run);

        // Gemmer tilmeldingen, så den huskes efter appen lukkes
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

        {/* Knappen skifter mellem Deltag og Afmeld aktivitet */}
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