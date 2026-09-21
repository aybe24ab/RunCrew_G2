import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

export default function RunDetailsScreen({ route }) {
  const { run } = route.params;

  const [joined, setJoined] = useState(false);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>{run.title}</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Aktivitet: {run.type}</Text>
        <Text style={styles.text}>Tempo: {run.pace}</Text>
        <Text style={styles.text}>Tidspunkt: {run.time}</Text>

        <Button
          title={joined ? 'Du deltager ✓' : 'Deltag'}
          onPress={() => setJoined(!joined)}
        />
      </View>

    </View>
  );
}
