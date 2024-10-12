import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [inputValue, setInputValue] = useState('');
  const [data,setData] = useState([]);
  const [databaseResults, setDatabaseResults] = useState([]); // Example state for database outputs
  const [fetchedData, setFetchedData] = useState(null); // Yeni durum
  const navigate = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.MEDICINE_BY_ID}${item.id}`);
          
          setData(response.data); // Gelen veriyi duruma kaydet
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      }
    };
  
    fetchData();
  }, [item]);

  
  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Reklam Alanı
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Reklam Alanı</Text>
      </View>
 */}
      <View style={styles.infoContainer}>
        <Text style={styles.medText}>{data.name}</Text>
        
        {item.hastaliklar && item.hastaliklar.name && (
            <Text style={styles.ingredientText}>{item.hastaliklar.name} hastalığı için</Text>
          )}
          {data.etken_madde && (
            <Text style={styles.ingredientText}>{data.etken_madde}</Text>
          )}
          {data.ilac_kategori && data.ilac_kategori.name && (
            <Text style={styles.ingredientText}>{data.ilac_kategori.name}</Text>
          )}

        
         

      </View>

      {data && data.hassasiyet_turu ? (
        <Input 
          id={data.hassasiyet_turu.id} 
          ilacId={data.id} 
          hastalikId={item.hastaliklar  ? item.hastaliklar.id : null} 
          // Eğer hastaliklar varsa ilk hastalığın id'sini alıyoruz, yoksa null
        />
      ) : (
        <Text>Loading...</Text> // Veriler yüklenene kadar gösterilen mesaj
      )}

      

      {/* Usage Instructions Button */}
      <TouchableOpacity 
        style={styles.instructionsButton} 
        onPress={() => {
          if (data.document) {
            navigate.navigate('PdfViewer', { documentUrl: data.document });

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
