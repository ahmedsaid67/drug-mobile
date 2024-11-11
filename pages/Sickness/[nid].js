import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator ,ScrollView} from 'react-native';
import styles from '../../styles/SicknessStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';
import { colors } from '../../styles/colors';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const hastaliklar = item.hastaliklar;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); 
  

  
  // Seçilen hastalıkla MedicineDetail'e yönlendirme işlevi
  const handleHastalikSec = (hastalik) => {
    // Seçilen hastalığı item'in içerisine ekleyerek güncelleme
    const updatedItem = {
      ...item, 
      hastaliklar: hastalik  // Seçilen hastalık tüm bilgileriyle eklendi
    };
    
   
      const id = item.hassasiyet_turu.id;
      if ([2,3,4,8,10,11].includes(id)) {
        navigation.navigate('Kilo Bilgisi', { item: updatedItem  }); // 1, 2, 4, 7, 8 için ilaca yönlendir
      } else if ([1,5,6,9].includes(id)) {
        navigation.navigate('Yaş Bilgisi', { item: updatedItem  }); // 3, 5, 6 için hastalık detayına yönlendir
      }
     
    
  };

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (

    <View style={styles.container}>
      <Text style={styles.inputLabel}>Doz hesaplamaya devam edebilmek için lütfen hastalığı seçiniz.</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </View>
    )
  );
};


export default NidSearchPage;
