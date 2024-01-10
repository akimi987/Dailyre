import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getCadavreDetails } from '../services/api';
import { useRoute } from '@react-navigation/native';
import { DataTable, Title, Paragraph } from 'react-native-paper';

const Details = () => {
  const [cadavreDetails, setCadavreDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContributions, setFilteredContributions] = useState(null);

  const route = useRoute();
  const cadavreId = route.params.cadavreId;

  useEffect(() => {
    const fetchCadavreDetails = async () => {
      try {
        const response = await getCadavreDetails(cadavreId);
        setCadavreDetails(response.data);
        setFilteredContributions(response.data.contributions);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails du cadavre :', error);
      }
    };

    fetchCadavreDetails();
  }, [cadavreId]);

 /*  const handleSearch = () => {
    console.log('Recherche effectuée avec la valeur :', searchQuery);
    if (searchQuery.trim() === '') {
      setFilteredContributions(cadavreDetails.contributions);
    } else {
      const filtered = cadavreDetails.contributions.filter((contribution) =>
        contribution.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContributions(filtered);
    }
  }; */

  if (!cadavreDetails) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Title style={styles.cardTitle}>Détails du Cadavre</Title>
        <Paragraph style={styles.cardText}>Nombre total de contributions : {cadavreDetails.total_contributions}</Paragraph>
        <Paragraph style={styles.cardText}>Nombre de jours écoulés : {cadavreDetails.nb_jours}</Paragraph>
        <Paragraph style={styles.cardText}>Nombre total de likes : {cadavreDetails.nb_likes}</Paragraph>
        <Paragraph style={styles.cardText}>Auteur : {cadavreDetails.auteur}</Paragraph>
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Contributions :</Title>
        {filteredContributions && filteredContributions.length > 0 ? (
          filteredContributions.map((contribution, index) => (
            <Paragraph key={index} style={styles.contributionText}>
              {contribution}
            </Paragraph>
          ))
        ) : (
          <Text style={styles.noResultsText}>Aucun résultat trouvé</Text>
        )}
      </View>

      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Contributeurs :</Title>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.tableHeader}>Noms des Contributeurs</DataTable.Title>
          </DataTable.Header>

          {cadavreDetails.contributeurs.map((contributeur, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell style={styles.tableCell}>{contributeur}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View style={styles.footer}>
        <Text style={styles.copyrightText}>&copy; 2024 Dalyre</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  contributionText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#444',
    textAlign: 'left', 
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 16,
    color: '#555',
  },
  noResultsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Details;
