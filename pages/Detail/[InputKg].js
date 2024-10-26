import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { API_ROUTES } from "../../utils/constant"
import axios from 'axios';
import { Alert } from 'react-native'; // Added import for Alert
import { useNavigation } from '@react-navigation/native';


const Input = ({ route }) => {
 const { item } = route.params; 
  const [inputValue, setInputValue] = useState(''); // Kullanıcı girişi
  const [result, setResult] = useState('');         // Hesaplama sonucu
  const [error, setError] = useState('');           // Hata mesajı
  const id = item.hassasiyet_turu.id;
  const ilacId = item.id;
  const hastalikId = item.hastaliklar.id;
  const navigation = useNavigation();


  
  const handleCalculate = async () => {
    try {
      setError(''); // Hata mesajını sıfırla
      let apiUrl = '';
      let params = {};
      let response;
      console.log("buradayım");

    
     

      // ID'ye göre API rotasını belirle ve parametreleri ayarla
      switch (id) {

        // Kilo-Doz	FALSE	2
        case 2:
          apiUrl = API_ROUTES.GET_DOSAGE_BY_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId}
          break;
         // Hastalıklı-Azalan-kilo	FALSE	3
        case 3:
          apiUrl = API_ROUTES.GET_DECREASED_DOSAGE_BY_DISEASE_AND_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId}
          break;
         // Azalan-kilo	FALSE	4
        case 4:
          apiUrl = API_ROUTES.GET_DOSAGE_DECREASING_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId}
          break;
        // Hastalıklı-yasa-baglı-azalan-kilo-doz	FALSE	5 burası özel durum içine alınmalı iki aşamalı bir durum var burada.
        case 5:
          
          apiUrl = API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT, 
          params= { age: item.input_yas, kilo: 10, ilac_id: ilacId, hastalik_id: hastalikId }
            
          break;

         // hastalıklı artan kilo	FALSE	8
        case 8:
          apiUrl = API_ROUTES.GET_INCREASING_DOSAGE_BY_DISEASE_AND_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId}
          break;
        default:
          setError('Geçersiz ID');
          return;
      }
      

      // şimdi burada olacak şey eğer case 5 ise seconddaki gibi bir istek atılacak
      
         // API isteği gönderiliyor
          response = await axios.get(apiUrl, { params });

          console.log(response.data);
          

          if (response?.data) {
            // Check uyarı kontrolü
            if (response.data.check_uyari) {
              const updatedItem = {
                ...item,        // Mevcut item'deki tüm verileri koruyoruz
                ...response.data // response.data'daki verileri item'a ekliyoruz
              };
            
              navigation.navigate("Uyarı", {item: updatedItem});
            } else {
              // Check uyarı yoksa sonuçları ayarla buradada med.js e gideceğiz
              const updatedItem = {
                ...item,        // Mevcut item'deki tüm verileri koruyoruz
                ...response.data // response.data'daki verileri item'a ekliyoruz
              }
              navigation.navigate('İlaç Bilgisi',  { item: updatedItem  });
            }
          } else {
            setError('API çağrısı başarısız oldu');
          }
      
      

    } catch (error) {
      console.error(error.response.data);
      console.log(error);
      console.log(error.response.data);
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  // Giriş alanını sıfırla
  const handleReset = () => {
    setInputValue('');
    setResult('');
   
    setError('');
    setKiloValue(''); // Kilo değerini sıfırla
    setShowKiloInput(false); // Kilo giriş alanını gizle
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Doz hesaplamaya devam edebilmek için lütfen kişinin kilogram bilgisini giriniz.</Text>
        <TouchableOpacity style={styles.inputTouchable}>
        <TextInput
          style={styles.input}
          placeholder="Kilogram giriniz"
          keyboardType="numeric"
           mode="outlined"
          value={inputValue}
          onChangeText={setInputValue}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => inputValue ? handleCalculate() : null} style={[
                        styles.forwardButton,
                        (!(inputValue)) && styles.forwardButtonDisabled
                    ]}>
          <Text style={styles.buttonText}>Hesapla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Input;