import React, { useEffect, useState  } from 'react';
import { View, ScrollView,Text, FlatList, TextInput, Image, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/HomePageStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../utils/constant';
import { useSelector } from 'react-redux';
import { colors } from '../styles/colors';


const { width } = Dimensions.get('window');



const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicines,setMedicines] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); 
  const user = useSelector((state) => state.user);


  

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(API_ROUTES.MEDICINE_FORM);
        const fetchedData = response.data.map(item => ({
          ...item,
          image: item.img || 'https://via.placeholder.com/500'  // Eğer img null ise placeholder kullan
        }));
        const responseProd = await axios.get(API_ROUTES.SUPPLEMENT);
        const fetchedDataProd = await Promise.all(responseProd.data.map(async item => {
          let product_id = item.id;
          
          if (item.product_category_count === 1) {
            const responseProductId = await axios.get(`${API_ROUTES.SUPPLEMENT_BY_PRODUCT_CATEGORY}${item.id}`);
            product_id = responseProductId.data[0].id;
          }
          
          return {
            ...item,
            image: item.img || 'https://via.placeholder.com/500',
            product_id: product_id
          };
        }));
        
        setMedicines(fetchedData);
        setProduct(fetchedDataProd);
      } catch (error) {
        // console.error('Error fetching data:', error);
        // Alert.alert('Error fetching data');
      }
      finally {
        
          setLoading(false); 
      }
    };

    fetchForm();
  }, []);


  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToNidPage(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const navigateToNidPage = (item) => {
    // `nid.js` sayfasına tıklanan kartın bilgilerini gönderiyoruz
    navigate.navigate('İlaçlar', { item });
  };

  const navigateToNidProd = (item) => {
    if (item.product_category_count > 1) {
      navigate.navigate('Takviye Seçimi', { item });
    } else {
      const updatedItem = {
        ...item,
        id: item.product_id
      };
      navigate.navigate('Besin Takviyeleri', { item: updatedItem });
    }
  };

  const renderCardProd = ({ item }) => (
   <TouchableOpacity style={styles.card} onPress={() => navigateToNidProd(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  

  const navigate = useNavigation();

  const navigateToScreen = (screenName, params = {}) => {
    navigate.navigate(screenName, params);
  };



  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    <View >
      
       
      {/* Searchbox */}
      <TextInput
        style={styles.searchBox}
        placeholder="Ara..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onPress={() => navigateToScreen('Arama', { showSearch: false })} // Tıklanıldığında arama sayfasına yönlendir
      />

      {/* İlaçlar */}
      <Text style={styles.sectionTitle}>İlaçlar</Text>

      {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={colors.loadingSize} color={colors.uygulamaRengi} />
      </View>
      ) : (
        <FlatList
          data={medicines.sort((a, b) => a.order - b.order)}
          renderItem={renderCard}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.75}  // Kart genişliğine göre
          decelerationRate="fast"
          pagingEnabled
        />
        )
      }

      

      {/* Besin Takviyeleri */}
      <Text style={styles.sectionTitle}>Besin Takviyeleri</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={colors.loadingSize} color={colors.uygulamaRengi} />
        </View>
        ) : (
          <FlatList
            data={product.sort((a, b) => a.order - b.order)}
            renderItem={renderCardProd}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.75}
            decelerationRate="fast"
            pagingEnabled
          />
        )
      }


    

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.reminderButton}
        onPress={() => {
          if (user && user.id)
          {
           navigateToScreen('Arama', { showModal: false });
          } 
          else 
          {
            navigate.navigate('Üyelik');
          }
      }}>
          
            <Text style={styles.reminderText}>Hatırlatıcı Ekle</Text>
            <Ionicons name="timer-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    )
  );
  
};

export default HomePage;
