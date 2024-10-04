import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [inputValue, setInputValue] = useState('');
  const [databaseResults, setDatabaseResults] = useState([]); // Example state for database outputs
  const navigate = useNavigation();

  console.log(item);
  const handleCalculate = () => {
    // Handle calculation logic here
  };

  const handleReset = () => {
    setInputValue('');
    setDatabaseResults([]); // Reset database results
  };

  console.log(item)

  const renderDatabaseResults = () => {
    // Render database results (example)
    return (
      <View style={styles.resultsContainer}>
        {databaseResults.map((result, index) => (
          <View key={index} style={styles.resultItem}>
            <Text>{result.title}</Text>
            <Text>{result.title}</Text>
            <Text>{result.details}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Reklam Alanı */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Reklam Alanı</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.medText}>{item.name}</Text>
        {/* <Text style={styles.ingredientText}>{item.hastaliklar.name}</Text>
        <Text style={styles.ingredientText}>{item.etken_madde}</Text>
        <Text style={styles.ingredientText}>{item.ilac_kategori.name}</Text> */}

      </View>

      <Input id={item.hassasiyet_turu.id} ilacId={item.id} hastalikId={item.hastaliklar.id}/>

      

      {/* Usage Instructions Button */}
      <TouchableOpacity 
      style={styles.instructionsButton} 
      onPress={() => {
        if (item.document) {
          // Belgeye yönlendirme işlemi
          console.log('Kullanım Talimatlarına gidiliyor...');
          // Örneğin, navigation veya link ile yönlendirme yapılabilir
          // navigation.navigate('DocumentScreen', { document: item.document });
        } else {
          console.log('Belge bulunamadı.');
        }
      }}
    >
      <Text style={styles.instructionsButtonText}>Kullanım Talimatları</Text>
    </TouchableOpacity>

    </ScrollView>
  );
};


export default NidSearchPage;
