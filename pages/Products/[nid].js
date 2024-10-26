import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native';
import styles from '../../styles/SicknessStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';
import { colors } from '../../styles/colors';


const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [supplements, setSupplements] = useState([]); // Eğer supplement listesi boşsa boş liste kullan
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.SUPPLEMENT_BY_PRODUCT_CATEGORY}${item.id}`);
          setSupplements(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      }
      finally {
        
          setLoading(false); 
       
        
      
    }
    };
  
    fetchData();
  }, [item]);
  
  // Seçilen supplement ile MedicineDetail'e yönlendirme işlevi
  const handleSupplementSelect = (supplement) => {
    // Seçilen supplement'i item'in içerisine ekleyerek güncelleme
   
    // MedicineDetail'e yönlendirme yaparken güncellenmiş item'i gönderiyoruz
    navigation.navigate('VitSearch', { item: supplement });
  };

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <>
    <View style={styles.container}>

    <Text style={styles.inputLabel}>Doz hesaplamaya devam edebilmek için lütfen besin takviyesi seçiniz.</Text>
      
      {/* Eğer supplement listesi boşsa mesaj göster */}
      {supplements.length === 0 ? (
        <TouchableOpacity 
          style={styles.noDiseaseTextContainer} 
          onPress={() => navigation.navigate('Besin Takviyeleri', { item })}
        >
          <Text style={styles.noDiseaseText}>Bu ilaç için supplement bilgisi bulunmamaktadır. İlaca gitmek için tıklayın.</Text>
        </TouchableOpacity>
      ) : (
        supplements.map((supplement, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.hastalikItem}
            onPress={() => handleSupplementSelect(supplement)} // Seçilen supplement ile yönlendirme
          >
            {/* Burada nesnenin adı render ediliyor */}
            <Text style={styles.hastalikText}>{supplement.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
    </>
    )
  );
};

export default NidSearchPage;
