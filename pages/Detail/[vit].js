import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'; // ActivityIndicator import eklendi
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import { colors } from '../../styles/colors';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [data, setData] = useState(null); // Gelen veriyi duruma kaydetmek için null ile başlattık
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.GET_SUPPLEMENT}${item.id}`);
          console.log(response.data);
          setData(response.data); // Gelen veriyi duruma kaydet
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      } finally {
       
        setLoading(false); 
      }
    };
  
    fetchData();
  }, [item]);

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {data ? (
      <>
      <View style={styles.infoContainer}>
        {/* Ürün adı */}
        <Text style={styles.medText}>{data.name}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.explanationText}>{data.explanation}</Text>
      </View>

      <TouchableOpacity 
        style={styles.purchaseButton} 
        onPress={() => {
          if (data.satin_al_link) {
            // Eğer satin_al_link mevcutsa, kullanıcıyı o linke yönlendir
            Linking.openURL(data.satin_al_link).catch(err => console.error('Link açılamadı:', err));
          } else {
            console.log('Satın alma bağlantısı mevcut değil.');
          }
        }}
      >
        <Text style={styles.purchaseButtonText}>Şimdi Satın Al</Text>
      </TouchableOpacity>
      </>
      ) : (
        <Text>Veriler yükleniyor...</Text> 
      )}
    </ScrollView>
    )
  );
};

export default NidSearchPage;
