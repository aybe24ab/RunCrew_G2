import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RunCrew</Text>

      <Text style={styles.subtitle}>
        Find løbe- og gåture i nærheden og vær aktiv sammen med andre.
      </Text>

      <Button
        title="Se aktiviteter"
        onPress={() => navigation.navigate('Runs')}
      />
    </View>
  );
}