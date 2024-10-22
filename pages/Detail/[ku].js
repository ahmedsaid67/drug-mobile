import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { API_ROUTES } from '../../utils/constant';
import { colors } from '../../styles/colors'; // Assuming colors are still being imported from a constants file
import styles from '../../styles/MedicineStyles';

const UseInfo = ({ route }) => {
  const { item } = route.params; 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.MEDICINE_BY_ID}${item.id}`);
          setData(response.data); 
          console.log(response.data);
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [item]);


  const handleCalculate = async () => {
    try {
      const apiUrl = API_ROUTES.GET_DOSAGE_BY_EXPLANATION;
      const params = { ilac_id: item.id };
  
      const response = await axios.get(apiUrl, { params });
      console.log(response.data);
  
      const updatedItem = {
        ...item,        // Preserve existing item data
        ...response.data // Merge new data from response
      };
  
      navigation.navigate('MedicineDetail', { item: updatedItem });
    } catch (error) {
      console.error("Error fetching dosage:", error);
    }
  };
  


// burada eğer hastalıklar var ise hastalığa yoksa ınputa bunun seçimi yapılacak
  const handleAccept = () => {
   
    if(data.hastaliklar.length === 0 ){
      console.log("selamlar");
      const id = data.hassasiyet_turu.id;
      if ([2,3,4,8].includes(id)) {
        navigation.navigate('InputKg', { item: data  }); // 1, 2, 4, 7, 8 için ilaca yönlendir
      } else if ([1,5,6].includes(id)) {
        navigation.navigate('InputAge', { item: data  }); // 3, 5, 6 için hastalık detayına yönlendir
      }
      else {
        handleCalculate();
      }
     
    }
    else{
      navigation.navigate('SicknessDetail', { item: data}); // 1, 2, 4, 7, 8 için ilaca yönlendir
    }

      

   
  };

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContanier}>
          <Text style={styles.medText}>{data.name}  </Text>
          <Text style={styles.warningText}>
          İlac Uyarısı: {data.kullanim_uyarisi && data.kullanim_uyarisi.trim() !== "" ?  data.kullanim_uyarisi : 'Bu ilacın herhangi bir kullanım uyarısı yoktur'} 
          </Text>
        </View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAccept} style={styles.forwardButton}>
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  );
};


export default UseInfo;
