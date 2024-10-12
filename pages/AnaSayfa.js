import React, { useEffect, useState } from 'react';
import { View, ScrollView,Text, FlatList, TextInput, Image, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/HomePageStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../utils/constant';


const { width } = Dimensions.get('window');


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(API_ROUTES.MEDICINE_FORM);
        const fetchedData = response.data.map(item => ({
          ...item,
          image: item.img || 'https://via.placeholder.com/500'  // Eğer img null ise placeholder kullan
        }));
        setMedicines(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error fetching data');
      }
    };

    fetchForm();
  }, []);

  const [medicines,setMedicines] = useState([]);

  const [supplements] = useState([
    { id: 1, name: 'Katagori 1',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 2, name: 'Katagori 2',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 3, name: 'Katagori 3',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 4, name: 'Katagori 4',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 5, name: 'Katagori 5',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 6, name: 'Katagori 6',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 7, name: 'Katagori 7',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 8, name: 'Katagori 8',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 9, name: 'Katagori 9',data:"supplements", image: 'https://via.placeholder.com/500' },
    { id: 10, name: 'Katagori 10',data:"supplements", image: 'https://via.placeholder.com/500' }
  ]);

  const [vitamins] = useState([
    { id: 1, name: 'Katagori 1',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 2, name: 'Katagori 2',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 3, name: 'Katagori 3',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 4, name: 'Katagori 4',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 5, name: 'Katagori 5',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 6, name: 'Katagori 6',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 7, name: 'Katagori 7',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 8, name: 'Katagori 8',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 9, name: 'Katagori 9',data:"vitamins", image: 'https://via.placeholder.com/500' },
    { id: 10, name: 'Katagori 10',data:"vitamins", image: 'https://via.placeholder.com/500' }
  ]);

  
  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToNidPage(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const navigateToNidPage = (item) => {
    // `nid.js` sayfasına tıklanan kartın bilgilerini gönderiyoruz
    navigate.navigate('NidSearchPage', { item });
  };
  

  const navigate = useNavigation();

  const navigateToScreen = (screenName, params = {}) => {
    navigate.navigate(screenName, params);
  };

 
  

  return (
    <ScrollView>
    <View style={styles.container}>
      

      {/* Searchbox */}
      <TextInput
        style={styles.searchBox}
        placeholder="Ara..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onPress={() => navigateToScreen('Arama')} // Tıklanıldığında arama sayfasına yönlendir
      />

      {/* İlaçlar */}
      <Text style={styles.sectionTitle}>İlaçlar</Text>
      <FlatList
        data={medicines}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}  // Kart genişliğine göre
        decelerationRate="fast"
        pagingEnabled
      />

      {/* Reklam Alanı */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Reklam Alanı</Text>
      </View>

      {/* Besin Takviyeleri */}
      <Text style={styles.sectionTitle}>Besin Takviyeleri</Text>
      <FlatList
        data={supplements}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        pagingEnabled
      />

     {/* Vitamin Alanı */}
     <TouchableOpacity style={styles.adContainer} onPress={() => navigateToNidPage({ data: 'vitamins' })}>
        <Text style={styles.adText}>Vitaminler</Text>
      </TouchableOpacity>

      {/* Sporcu Besinler */}
      <Text style={styles.sectionTitle}>Sporcu Besinler</Text>
      <FlatList
        data={supplements}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        pagingEnabled
      />

      {/* Sporcu Besinler */}
      <Text style={styles.sectionTitle}>Sporcu Besinler</Text>
      <FlatList
        data={supplements}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        pagingEnabled
      />
      {/* Sporcu Besinler */}
      <Text style={styles.sectionTitle}>Sporcu Besinler</Text>
      <FlatList
        data={supplements}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        pagingEnabled
      />
      {/* Sporcu Besinler */}
      <Text style={styles.sectionTitle}>Sporcu Besinler</Text>
      <FlatList
        data={supplements}
        renderItem={renderCard}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.75}
        decelerationRate="fast"
        pagingEnabled
      />

      {/* Hatırlatıcı Butonu */}
      <TouchableOpacity style={styles.reminderButton}
       onPress={() => navigateToScreen('Hatırlatıcılar')}
       >
        <Text style={styles.reminderText}>Hatırlatıcı Ekle</Text>
        <Ionicons name="timer-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default HomePage;
