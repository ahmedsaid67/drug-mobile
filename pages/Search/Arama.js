import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles'; // Stillerin içe aktarılması

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  


  const medicines = [
    { id: 1, name: 'İlaç 1', activeIngredient: 'Etken Madde 1' },
    { id: 2, name: 'İlaç 2', activeIngredient: 'Etken Madde 2' },
    { id: 3, name: 'İlaç 3', activeIngredient: 'Etken Madde 3' },
    { id: 4, name: 'İlaç 4', activeIngredient: 'Etken Madde 4' },
    { id: 5, name: 'İlaç 5', activeIngredient: 'Etken Madde 5' },
    { id: 6, name: 'İlaç 6', activeIngredient: 'Etken Madde 6' },
    { id: 7, name: 'İlaç 7', activeIngredient: 'Etken Madde 7' },
    { id: 8, name: 'İlaç 8', activeIngredient: 'Etken Madde 8' },
    { id: 9, name: 'İlaç 9', activeIngredient: 'Etken Madde 9' },
    { id: 10, name: 'İlaç 10', activeIngredient: 'Etken Madde 10' }
  ];

  const popularSearches = [
    'İlaç 1',
    'İlaç 2',
    'İlaç 3',
    'İlaç 4',
    'İlaç 5',
    'İlaç 6',
    'İlaç 7',
    'İlaç 8',
    'İlaç 9',
    'İlaç 10'
  ];

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInput = text => {
    setSearchTerm(text);
    if (text.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleSearchComplete = () => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setSearchTerm(''); // Arama terimini temizle
      Keyboard.dismiss(); // Klavyeyi kapat
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Ara..."
          value={searchTerm}
          onChangeText={handleSearchInput}
          onFocus={() => setIsSearching(true)}
          onSubmitEditing={handleSearchComplete}
        />
      </View>

      {!searchTerm && !isSearching && (
        <ScrollView>
          <View style={styles.popularSearchesContainer}>
            <Text style={styles.sectionTitle}>Popüler Aramalar</Text>
            {popularSearches.map((term, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setSearchTerm(term); 
                setIsSearching(true); // Arama sonuçlarını göstermek için arama modunu aç
              }}>
                <Text style={styles.popularSearchItem}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
        </ScrollView>
      )}

      {searchTerm && isSearching && (
        <FlatList
          style={styles.searchResultsContainer}
          data={filteredMedicines}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.medicineItem}>
              <View style={styles.medicineContent}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <Ionicons name="chevron-forward-outline" size={30} color="#000" />
              </View>
              <Text style={styles.activeIngredient}>{item.activeIngredient}</Text>
              <View style={styles.divider} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;
