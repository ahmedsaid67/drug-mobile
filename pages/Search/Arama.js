import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles'; // Stillerin içe aktarılması
import { API_ROUTES } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native'; // navigate fonksiyonu için
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const navigation = useNavigation(); // useNavigation kullanımı

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(API_ROUTES.COMBINED);
        setMedicines(response.data);
<<<<<<< Updated upstream
        console.log(response.data);
=======
>>>>>>> Stashed changes
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
    };

    fetchMedicines(); // Call the data fetching function
  }, []);
  
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

  // Türkçe karakterleri standart hale getiren yardımcı fonksiyon
  const normalizeString = (str) => {
    return str
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .replace(/Ç/g, 'C')
      .replace(/Ğ/g, 'G')
      .replace(/İ/g, 'I')
      .replace(/Ö/g, 'O')
      .replace(/Ş/g, 'S')
      .replace(/Ü/g, 'U');
  };

  // Sembolleri temizlemek için yardımcı fonksiyon
  const cleanString = (str) => {
    return str.replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '').trim(); // Türkçe karakterleri koruyarak sembolleri temizler
  };

  // Arama işlemi için filtreleme
  const filteredMedicines = medicines.filter(medicine => 
    normalizeString(cleanString(medicine.name.toLowerCase().replace(/\s+/g, ''))) // Boşlukları kaldır ve normalleştir
      .includes(normalizeString(cleanString(searchTerm.toLowerCase().replace(/\s+/g, '')))) // Boşlukları kaldır ve normalleştir
  );

  const handleSearchInput = text => {
    setSearchTerm(text);
    setIsSearching(text.length > 0);
  };

  const handleSearchComplete = () => {
    if (searchTerm.trim() === '') {
      setIsSearching(false);
      setSearchTerm('');
      Keyboard.dismiss();
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // bura hastalıklar yerine hassasiyet ıd olarak decğiştirilecek
        // hastaliklar dizisinin dolu olup olmadığını kontrol et
        console.log(item);
        console.log(item.hassasiyet_turu_id);
        if(item.sayfa === "ilac"){
          const id = item.hassasiyet_turu_id;
          if ([1, 2, 4, 7, 8].includes(id)) {
            navigation.navigate('MedicineDetail', { item }); // 1, 2, 4, 7, 8 için ilaca yönlendir
          } else if ([3, 5, 6].includes(id)) {
            navigation.navigate('SicknessDetail', { item }); // 3, 5, 6 için hastalık detayına yönlendir
          }
        }
        else if(item.sayfa === "besin takviyesi"){
          const id = item.product_category__supplement;
          console.log(id);
          navigation.navigate('VitDetail', { item }); // 3, 5, 6 için hastalık detayına yönlendir
        }
      }}
      
    >
      <View style={styles.medicineItem}>
        <View style={styles.medicineContent}>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </View>
        <Text style={styles.activeIngredient}>{item.etken_madde}</Text>
        <View style={styles.divider} />
      </View>
    </TouchableOpacity>
  );

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
                setIsSearching(true);
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
          data={filteredMedicines} // data prop'u FlatList'e eklenmeli
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default App;
