import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import styles from '../styles';

export default function RunsScreen({ navigation }) {

  const runs = [
    {
      id: '1',
      type: 'Løb',
      title: '5 km ved Søerne',
      pace: '6:00 min/km',
      time: 'Mandag kl. 17:00',
    },
    {
      id: '2',
      type: 'Gåtur',
      title: '4 km i Frederiksberg Have',
      pace: 'Roligt tempo',
      time: 'Onsdag kl. 18:00',
    },
    {
      id: '3',
      type: 'Løb',
      title: '10 km ved Amager Strand',
      pace: '6:15 min/km',
      time: 'Lørdag kl. 10:00',
    },
    {
      id: '4',
      type: 'Gåtur',
      title: '5 km rundt om Søerne',
      pace: 'Moderat tempo',
      time: 'Søndag kl. 11:00',
    },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Kommende aktiviteter</Text>

      <FlatList
        data={runs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.text}>Aktivitet: {item.type}</Text>
            <Text style={styles.text}>Tempo: {item.pace}</Text>
            <Text style={styles.text}>Tidspunkt: {item.time}</Text>

            <Button
              title="Se aktivitet"
              onPress={() =>
                navigation.navigate('RunDetails', { run: item })
              }
            />

          </View>
        )}
      />

    </View>
  );
}