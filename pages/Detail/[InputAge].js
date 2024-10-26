import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles/MedicineStyles';

import axios from 'axios';
import { Alert } from 'react-native'; // Added import for Alert
import { useNavigation } from '@react-navigation/native';
import { API_ROUTES } from '../../utils/constant';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import Ionicons from 'react-native-vector-icons/Ionicons';



const Input = ({ route }) => {
 const { item } = route.params; 
  const [inputValue, setInputValue] = useState(''); // Kullanıcı girişi
  const [result, setResult] = useState('');         // Hesaplama sonucu
  const [explanation, setExplanation] = useState(''); // Açıklama
  const [error, setError] = useState('');           // Hata mesajı
  const [second, setSecond] = useState(false);
  const [kiloValue, setKiloValue] = useState('');
  const [showKiloInput, setShowKiloInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = item.hassasiyet_turu.id;
  const ilacId = item.id;
  const hastalikId = item.hastaliklar.id;
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [calculatedAge, setCalculatedAge] = useState('');
  const [ageInfo, setInfoAge] = useState('');
  const [calculatedYear, setCalculatedYear] = useState('');
  const [dateStep, setDateStep] = useState('Yıl'); // Adım takibi için state

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setDateStep('Yıl'); // İlk adım olarak yılı ayarla
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setBirthDate(date);
    calculateAge(date);
    hideDatePicker();
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDay();

    let ageYear = today.getFullYear() - birthYear;
    let ageMonth = today.getMonth() - birthMonth;
    let ageDay = today.getDay() - birthDay;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
      ageYear--;
      ageMonth += 12;
    }

    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    const totalMonths = ageYear * 12 + ageMonth;
    setCalculatedYear(ageYear);
    setCalculatedAge(totalMonths);
    setInfoAge(`Yaşınız: ${ageYear} Yıl, ${ageMonth} Ay`);
    
  };

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
          params = { ilac_id: ilacId , yas: calculatedAge,  yas_birimi: "ay"};
          break;
        
        case 5:
          try {
            const ageWeightData = await axios.get(API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT_DATA_AGE, {
              params: {
                ilac_id: ilacId,
                hastalik_id: hastalikId,
                age: calculatedYear
              }
            });

            const { threshold_age } = ageWeightData.data;

            if (parseInt(calculatedYear) < threshold_age) {
              // Yaş eşik değerden küçükse kilo bilgisi isteniyor
              console.log("Yaş eşik değerden küçük, kilo bilgisi isteniyor");
              console.log("selamlar");
              
              const updatedItem = {
                ...item,
                input_yas: calculatedYear // Yaşı ekliyoruz
              };
              navigation.navigate('Kilo Bilgisi', { item: updatedItem });
              return; // Burada işlem bitiyor, bir sonraki aşamaya geçilmiyor.
            }
            
            // Yaş kontrolü geçildi, ama kilo bilgisi gerekiyor olabilir
            apiUrl = API_ROUTES.GET_DECREASING_DOSE_BY_DISEASE_AGE_WEIGHT;
            params = { age: calculatedYear, ilac_id: ilacId, hastalik_id: hastalikId, }
           
            

          } catch (error) {
            console.error("Hata oluştu: ", error);
          }
        break;

        // Hastalık-Yaş	FALSE	6    
        case 6:
          apiUrl = API_ROUTES.GET_DOSAGE_BY_AGE_AND_DISEASE;
          params = {ilac_id: ilacId, hastalik_id: hastalikId, yas: calculatedAge,  yas_birimi: "ay" }
          break;
        
        default:
          setError('Geçersiz ID');
          return;
      }
      
      if(!second){
         // API isteği gönderiliyor
          response = await axios.get(apiUrl, { params });
          console.log(response.data);
          console.log("selamlar");

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
      }
    } catch (error) {
      console.error(error.response.data);
      console.log(error);
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Doz hesaplamaya devam edebilmek için lütfen kişinin yaş bilgisini giriniz.</Text>
        <TouchableOpacity onPress={showDatePicker}  style={styles.inputTouchable} >
          <TextInput
            style={styles.input}
            placeholder="DD - MM - YYYY"
            keyboardType="numeric"
            value={ageInfo}
            editable={false} // Kullanıcı manuel olarak değiştiremesin
            pointerEvents="none" // TextInput'un dokunma olaylarını devre dışı bırak
          />

          <Ionicons name="calendar" style={styles.iconSmall} /> 
          
        </TouchableOpacity>
      </View>
        

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => birthDate ? handleCalculate() : null}  style={[
                        styles.forwardButton,
                        (!(birthDate)) && styles.forwardButtonDisabled
                    ]}>
          <Text style={styles.buttonText}>Hesapla</Text>
        </TouchableOpacity>
      </View>

        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
     
     
    </View>
  );
};

export default Input;
