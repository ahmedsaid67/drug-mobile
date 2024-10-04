import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/MedicineStyles';
import { API_ROUTES } from "../utils/constant"
import axios from 'axios';


const Input = ({ id, ilacId, hastalikId }) => {
  const [inputValue, setInputValue] = useState(''); // Kullanıcı girişi
  const [result, setResult] = useState('');         // Hesaplama sonucu
  const [explanation, setExplanation] = useState(''); // Açıklama
  const [error, setError] = useState('');           // Hata mesajı
  const [second, setSecond] = useState(false);

  const handleCalculate = async () => {
    try {
      setError(''); // Hata mesajını sıfırla
      let apiUrl = '';
      let params = {};
      let response;


      // ID'ye göre API rotasını belirle ve parametreleri ayarla
      switch (id) {

        // Yaş-Doz	FALSE	1
        // yıl ve ay için düzgün bir sonuç yazmalıyım
        case 1:
          apiUrl = API_ROUTES.GET_DOSAGE_BY_AGE;
          params = { ilac_id: ilacId , yas: inputValue,  yas_birimi: "ay"};
          break;
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
          setSecond(true);
        apiUrl = API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT_DATA_AGE;
        params = { ilac_id: ilacId, hastalik_id: hastalikId };

        try {
          // İlk isteği gönderiyoruz
          const response = await axios.get(apiUrl, { params });

          // Yaş kontrolü
          if (parseInt(inputValue) >= response.data.threshold_age) {
            // Yaş threshold_age'e eşit veya büyükse, kilo bilgisi olmadan istek yapıyoruz
            console.log("geliyor");
            setSecond(true);

            const responseWithoutKilo = await axios.get('http://192.168.1.202:8000/api/appname/hastalikhemyasahemkiloyabagliazalandoz/get-hastalik-azalan-doz-hem-kilo-hem-yas/', {
              params: {
                age: inputValue,
                ilac_id: ilacId,
                hastalik_id: hastalikId,
              }
            });
            console.log("Response Without Kilo:", responseWithoutKilo.data);
            setExplanation(responseWithoutKilo.data.message);

          } else {
            
            // bak burada yapmanı istediğim şey ana kodu 
            
          }
        } catch (error) {
          console.error("Hata:", error);
          setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
        }

        break;


        // Hastalık-Yaş	FALSE	6    
        case 6:
          apiUrl = API_ROUTES.GET_DOSAGE_BY_AGE_AND_DISEASE;
          params = {ilac_id: ilacId, hastalik_id: hastalikId, yas: inputValue,  yas_birimi: "ay" }
          break;
        
        // Explations-Doz	FALSE	7 eğer explation lu ise direk çıktı almalıyım çıktı bilgi diye geliyor
        case 7:
          apiUrl = API_ROUTES.GET_DOSAGE_BY_EXPLANATION;
          params = { ilac_id: ilacId };
          response = await axios.get(apiUrl, { params });
          if (response?.data) {
            setResult(`Sonuç: ${response.data.bilgi}`);
            setExplanation(`Açıklama: ${response.data.message}`);
          }
          return; // useEffect tetiklediği için butonla işlem olmayacak
         // hastalıklı artan kilo	FALSE	8
        case 8:
          apiUrl = API_ROUTES.GET_INCREASED_DOSAGE_BY_DISEASE_AND_WEIGHT;
          params = {kilo: inputValue, ilac_id: ilacId, hastalik_id: hastalikId}
          break;
        default:
          setError('Geçersiz ID');
          return;
      }

      
     
      
      if(!second){
         // API isteği gönderiliyor
          response = await axios.get(apiUrl, { params });
          console.log(response.data);

          if (response?.data) {
            setResult(`Sonuç: ${response.data.doz}`);
            setExplanation(`Açıklama: ${response.data.message}`);
          } 
          else {
            setError('API çağrısı başarısız oldu');
          }


      }
      

      

     

    } catch (error) {
      console.error(error.response.data);
      console.log(error);
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  useEffect(() => {
    if (id === 7) {
      handleCalculate();
    }
  }, [id]);


  // Giriş alanını sıfırla
  const handleReset = () => {
    setInputValue('');
    setResult('');
    setExplanation('');
    setError('');
  };

  return (
    <View style={styles.container}>
      {/* Kilo veya Yaş Giriş Alanı */}
      <View style={styles.inputContainer}>
        {id === 2 || id === 3 ? (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Kg Girin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        ) : id === 1 || id === 5 || id === 6|| id === 8 ? (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Yaş Girin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Yaş"
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
            />
          </View>
        ) : null}
      </View>

      {/* Butonlar */}
      {id !== 7 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>Hesapla</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Sıfırla</Text>
          </TouchableOpacity>
        </View>
      )}


      {/* Hata Mesajı */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Sonuçlar */}
      {result ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}

      {/* Açıklama */}
      {explanation ? (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;
