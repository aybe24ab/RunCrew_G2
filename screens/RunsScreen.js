import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
} from 'react-native';

import styles from '../styles';

export default function RunsScreen({ navigation }) {

  // Gem det, brugeren skriver i søgefeltet
  const [search, setSearch] = useState('');

  // Eksisterende aktiviteter fra G1
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

  // Filtrer aktiviteter ud fra brugerens søgning
  const filteredRuns = runs.filter((run) => {

    const searchText = search.toLocaleLowerCase('da-DK').trim();

    return (
      run.title.toLocaleLowerCase('da-DK').includes(searchText) ||
      run.type.toLocaleLowerCase('da-DK').includes(searchText) ||
      run.pace.toLocaleLowerCase('da-DK').includes(searchText) ||
      run.time.toLocaleLowerCase('da-DK').includes(searchText)
    );
  });

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Kommende aktiviteter
      </Text>

      {/* Nyt søgefelt til G2 */}
      <TextInput
        style={styles.searchInput}
        placeholder="Søg efter område eller aktivitet..."
        value={search}
        onChangeText={setSearch}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {/* Viser hvor mange aktiviteter der matcher */}
      <Text style={styles.text}>
        {filteredRuns.length} aktiviteter fundet
      </Text>

      <FlatList
        data={filteredRuns}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            Ingen aktiviteter matcher din søgning.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>

            <Text style={styles.text}>
              Aktivitet: {item.type}
            </Text>

            <Text style={styles.text}>
              Tempo: {item.pace}
            </Text>

            <Text style={styles.text}>
              Tidspunkt: {item.time}
            </Text>

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