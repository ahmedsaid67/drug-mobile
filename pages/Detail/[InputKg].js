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
          params= { age: item.input_yas, kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId }
            
          break;

         // hastalıklı artan kilo	FALSE	8
        case 8:
          apiUrl = API_ROUTES.GET_INCREASED_DOSAGE_BY_DISEASE_AND_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId}
          break;
          
        case 9:
        // hastalık hem yas hem kilo artan
          apiUrl = API_ROUTES.GET_INCREASED_DOSAGE_BY_DISEASE_AGE_AND_WEIGHT, 
          params= { age: item.input_yas, kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId }
            
          break;

        case 10:
        // artan kilo
          apiUrl = API_ROUTES.GET_DOSAGE_INCREASING_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId}

          break;
        
        case 11:
          // hastalık artan kilo
          apiUrl = API_ROUTES.GET_INCREASED_DOSAGE_BY_DISEASE_AND_WEIGHT;
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
          

          function formatAllAmountsInString(input) {
            return input.replace(/(\d+(\.\d+)?)(\s*ml)/g, (match, number) => {
              const formattedNumber = formatAmount(number);
              return formattedNumber;
            });
          }
          
          function formatAmount(value) {
            const number = parseFloat(value.replace(",", "."));
            if (isNaN(number)) return value;
            return number % 1 === 0 ? `${number.toFixed(0)} ml` : `${number.toFixed(1).replace(".", ",")} ml`;
          }
          
          // Kullanım:
          if (response?.data) {
            const formattedMessage = formatAllAmountsInString(response.data.message);
          
            const updatedItem = {
              ...item,
              ...response.data,
              message: formattedMessage
            };
          
            if (response.data.check_uyari) {
              navigation.navigate("Uyarı", { item: updatedItem });
            } else {
              navigation.navigate("İlaç Bilgisi", { item: updatedItem });
            }
          } else {
            setError("API çağrısı başarısız oldu");
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
                        styles.calculateButton,
                        (!(inputValue)) && styles.calculateButtonDisabled
                    ]}>
          <Text style={styles.buttonText}>Hesapla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Input;