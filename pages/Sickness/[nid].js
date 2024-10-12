import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/SicknessStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [hastaliklar, setHastaliklar] = useState([]); // Eğer hastalıklar boşsa boş liste kullan
  const navigation = useNavigation();
  const [data,setData] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.MEDICINE_BY_ID}${item.id}`);
          setHastaliklar(response.data.hastaliklar);
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      }
    };
  
    fetchData();
  }, [item]);
  
  // Seçilen hastalıkla MedicineDetail'e yönlendirme işlevi
  const handleHastalikSec = (hastalik) => {
    // Seçilen hastalığı item'in içerisine ekleyerek güncelleme
    const updatedItem = {
      ...item, 
      hastaliklar: hastalik  // Seçilen hastalık tüm bilgileriyle eklendi
    };
    
    // MedicineDetail'e yönlendirme yaparken güncellenmiş item'i gönderiyoruz
    navigation.navigate('MedicineDetail', { item: updatedItem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hastalıklar:</Text>
      
      {/* Eğer hastalıklar listesi boşsa mesaj göster */}
      {hastaliklar.length === 0 ? (
        <TouchableOpacity 
          style={styles.noDiseaseTextContainer} 
          onPress={() => navigation.navigate('MedicineDetail', { item })}
        >
          <Text style={styles.noDiseaseText}>Bu ilaç için hastalık bilgisi bulunmamaktadır. İlaca gitmek için tıklayın.</Text>
        </TouchableOpacity>
      ) : (
        hastaliklar.map((hastalik, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.hastalikItem}
            onPress={() => handleHastalikSec(hastalik)} // Seçilen hastalıkla yönlendirme
          >
            {/* Burada nesnenin adı render ediliyor */}
            <Text style={styles.hastalikText}>{hastalik.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

export default NidSearchPage;
