import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      {/* Viser appens navn på forsiden */}
      <Text style={styles.title}>RunCrew</Text>

      {/* Kort beskrivelse af appens formål */}
      <Text style={styles.subtitle}>
        Find løbe- og gåture i nærheden og vær aktiv sammen med andre.
      </Text>

      {/* Sender brugeren til listen over kommende aktiviteter */}
      <Button
        title="Se aktiviteter"
        onPress={() => navigation.navigate('Runs')}
      />

      {/* Ny knap fra G2, som åbner brugerens tilmeldte aktiviteter */}
      <View style={{ marginTop: 15 }}>
        <Button
          title="Mine aktiviteter"
          onPress={() => navigation.navigate('MyActivities')}
          color="#1B4332"
        />
      </View>

    </View>
  );
}