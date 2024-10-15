import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../../styles/colors';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation(); // 'navigate' yerine 'navigation'

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.MEDICINE_BY_ID}${item.id}`);
          setData(response.data); 
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
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.medText}>{data.name} id {data.id}</Text>
          
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
      
        {data.kullanim_uyarisi && (
          <View style={styles.warningBox}>
            <Icon name="info" size={24} style={styles.warningIcon} />
            <Text style={styles.warningText}>İlaç Uyarısı: {data.kullanim_uyarisi}</Text>
          </View>
        )}

        {data && data.hassasiyet_turu ? (
          <Input 
            id={data.hassasiyet_turu.id} 
            ilacId={data.id} 
            hastalikId={item.hastaliklar ? item.hastaliklar.id : null} 
          />
        ) : (
          <Text>Loading...</Text>
        )}

        <TouchableOpacity 
          style={styles.instructionsButton} 
          onPress={() => {
            if (data.document) {
              navigation.navigate('PdfViewer', { documentUrl: data.document });
            } else {
              console.log('Belge bulunamadı.');
            }
          }}
        >
          <Text style={styles.instructionsButtonText}>Kullanım Talimatları</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
    )
  );
};

export default NidSearchPage;
