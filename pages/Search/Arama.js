import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet, Keyboard, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles'; // Stillerin içe aktarılması
import { API_ROUTES } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native'; // navigate fonksiyonu için
import axios from 'axios';
import { colors } from '../../styles/colors';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const navigation = useNavigation(); // useNavigation kullanımı
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const createReminder = () => {
    navigation.navigate('Hatırlatıcı Oluştur', { name: selectedItem.name });
    setModalVisible(false); // Modalı kapat
  };

  const navigateToDoseCalculation = () => {
    if (selectedItem.sayfa === 'ilac') {
      navigation.navigate('Kullanım Uyarısı', { item: selectedItem }); // İlaca yönlendirme
    } else if (selectedItem.sayfa === 'besin takviyesi') {
      navigation.navigate('Vitamin Bilgisi', { item: selectedItem }); // Takviyeye yönlendirme
    }
    setModalVisible(false); // Modalı kapat
  };


  // Modalı açan fonksiyon
  const openModal = (item) => {
    setSelectedItem(item); // Tıklanan item'i state'e kaydet
    setModalVisible(true); // Modalı aç3
  };

  const closeModal = () => {
    setSelectedItem(null); // selectedItem sıfırlanıyor
    setModalVisible(false); // Modal kapanıyor
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(API_ROUTES.COMBINED);
        setMedicines(response.data);
        console.log("data",response.data);

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
      onPress={() => openModal(item)} // Modalı açmak ve item'i iletmek için
      
    >
      <View style={styles.medicineItem}>
        <View style={styles.medicineContent}>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Ionicons name="chevron-forward-outline" size={colors.iconHeight} color={colors.text}/>
        </View>
        {item.etken_madde ? (
            <Text style={styles.activeIngredient}>{item.etken_madde}</Text>
          ) : null}
        
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
       {/* Modal */}
       <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal} // Geri tuşuna basılınca modal kapansın
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal} activeOpacity={1}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <Text style={styles.modalTitle}>Ne yapmak istersiniz?</Text>
            <TouchableOpacity style={styles.button}  onPress={navigateToDoseCalculation}>
              <Text style={styles.buttonText}>Doz Hesaplama</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecond} onPress={createReminder}>
              <Text style={styles.buttonText}>Hatırlatıcı Oluştur</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {!searchTerm && !isSearching && (
        <ScrollView>
          <View style={styles.popularSearchesContainer}>
            
          </View>
        </ScrollView>
      )}

      {searchTerm && isSearching && (
        <FlatList
          style={styles.searchResultsContainer}
          keyboardShouldPersistTaps="always"
          data={filteredMedicines} // data prop'u FlatList'e eklenmeli
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default App;
