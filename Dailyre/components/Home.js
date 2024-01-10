import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getCadavres } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [cadavres, setCadavres] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCadavres = async () => {
      try {
        const response = await getCadavres();
        console.log('Données des cadavres:', response.data);
        setCadavres(response.data.cadavres);
      } catch (error) {
        console.error('Erreur lors de la récupération des cadavres :', error);
      }
    };

    fetchCadavres();
  }, []);

  const handleCadavrePress = (cadavreId) => {
    navigation.navigate('Details', { cadavreId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCadavrePress(item.id_cadavre)}
      style={styles.cadavreContainer}
    >
      <View>
        <Text style={styles.cadavreTitle}>{item.titre}</Text>
        <Text style={styles.participationCount}>
          Nombre de participations : {item.contributeurs.length}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cadavres}
        keyExtractor={(item) => item.id_cadavre.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  cadavreContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cadavreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  participationCount: {
    color: 'gray',
  },
});

export default Home;
