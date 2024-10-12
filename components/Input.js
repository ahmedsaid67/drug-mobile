import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/MedicineStyles';
import { API_ROUTES } from "../utils/constant"
import axios from 'axios';
import { Alert } from 'react-native'; // Added import for Alert


const Input = ({ id, ilacId, hastalikId }) => {
  const [inputValue, setInputValue] = useState(''); // Kullanıcı girişi
  const [result, setResult] = useState('');         // Hesaplama sonucu
  const [explanation, setExplanation] = useState(''); // Açıklama
  const [error, setError] = useState('');           // Hata mesajı
  const [second, setSecond] = useState(false);
  const [kiloValue, setKiloValue] = useState('');
  const [showKiloInput, setShowKiloInput] = useState(false);
  const [loading, setLoading] = useState(false);

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
          const ageWeightData = await axios.get(API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT_DATA_AGE, {
            params: {
              ilac_id: ilacId,
              hastalik_id: hastalikId,
              age: inputValue
            }
          });
          const { threshold_age } = ageWeightData.data;
          if (parseInt(inputValue) < threshold_age) {
            setShowKiloInput(true);
            setLoading(false);
            setError('Lütfen kilo bilgisini girin.'); // Kullanıcıya kilo girmesi için uyarı
            return;
          }
          // Eğer yaş kontrolü geçilirse, sadece yaş bilgisi ile istek at
          apiUrl = API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT;
          params = {
            age: inputValue,
            ilac_id: ilacId,
            hastalik_id: hastalikId
          };
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
            console.log(response.data);
          }
          return; // useEffect tetiklediği için butonla işlem olmayacak
         // hastalıklı artan kilo	FALSE	8
        case 8:
          apiUrl = API_ROUTES.GET_INCREASING_DOSAGE_BY_DISEASE_AND_WEIGHT;
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
            // Check uyarı kontrolü
            if (response.data.check_uyari) {
              // Popup gösterme
              Alert.alert(
                "Uyarı",
                response.data.check_uyari,
                [
                  {
                    text: "İptal",
                    onPress: () => handleReset(), // İptal edilirse resetle
                    style: "cancel"
                  },
                  {
                    text: "Tamam",
                    onPress: () => {
                      // Uyarıyı kabul ederse sonuçları ayarla
                      let resultMessage = '';

                      if (response.data.doz) {
                        resultMessage += `Önerilen doz: ${response.data.doz}`;
                      }
                      if (response.data.message) {
                        resultMessage += `Önerilen doz: ${response.data.message}`;
                      }

                      setResult(resultMessage || 'Sonuç bulunamadı');
                    }
                  }
                ]
              );
            } else {
              // Check uyarı yoksa sonuçları ayarla
              let resultMessage = '';

              if (response.data.doz) {
                resultMessage += `Doz: ${response.data.doz}`;
              }
              if (response.data.message) {
                resultMessage += `\nAçıklama: ${response.data.message}`;
              }

              setResult(resultMessage || 'Sonuç bulunamadı');
            }
          } else {
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
    setKiloValue(''); // Kilo değerini sıfırla
    setShowKiloInput(false); // Kilo giriş alanını gizle
  };

  // Kilo bilgisi ile istek atma
  const handleKiloSubmit = async () => {
    if (!kiloValue) {
      setError('Kilo girilmedi');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Kilo ve yaş bilgisi ile istek at
      const response = await axios.get(API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT, {
        params: {
          age: inputValue,
          kilo: kiloValue, // Kilo bilgisi burada kullanılıyor
          ilac_id: ilacId,
          hastalik_id: hastalikId
        }
      });
      setResult(response.data.message); // Sonuç mesajını ayarla
      setShowKiloInput(false); // Kilo giriş alanını gizle
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
        ) : (id === 1 || id === 5 || id === 6 || id === 8) && !showKiloInput ? ( // Yaş giriş alanını gizle
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
        {showKiloInput && (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Kg Girin:</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              keyboardType="numeric"
              value={kiloValue}
              onChangeText={setKiloValue}
            />
          </View>
        )}
      </View>

      {/* Butonlar */}
      {id !== 7 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              if (showKiloInput) {
                handleKiloSubmit(); // Kilo girişi varsa kilo hesapla
              } else {
                handleCalculate(); // Kilo girişi yoksa hesapla
              }
            }}
          >
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
          {/* Sonuçları işleme */}
          {typeof result === 'string' ? (
            <Text style={styles.resultText}>{result}</Text>
          ) : (
            <>
              {result.message && (
                <Text style={styles.resultText}>Doz Miktarı: {result.message}</Text>
              )}
              {result.kullanim_sikligi && (
                <Text style={styles.resultText}>Kullanım Sıklığı: {result.kullanim_sikligi}</Text>
              )}
              {result.doz && (
                <Text style={styles.resultText}>{result.doz}</Text>
              )}
              {result.bilgi && (
                <Text style={styles.resultText}>{result.bilgi}</Text>
              )}
            </>
          )}
        </View>
      ) : null}

      {/* Açıklama */}
      {explanation ? (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{explanation}</Text>
        </View>
      ) : null}

     

      {/* Yükleniyor */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;