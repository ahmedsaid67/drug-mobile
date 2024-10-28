import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { useInterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads'
import Ionicons from 'react-native-vector-icons/Ionicons';;
import { useSelector } from 'react-redux';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();
  const [isNotRecommended, setIsNotRecommended] = useState(false); // Yeni durum eklendi
  const user = useSelector((state) => state.user);

  const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // message, doz veya bilgi alanlarını kontrol et
    if (
      item.message === "0 ölçek kullanın." || 
      item.message === "Kullanımı önerilmez." || 
      item.message === "Kullanımı önerilmez" || 
      item.doz === "0 ölçek kullanın." || 
      item.doz === "Kullanımı önerilmez." || 
      item.doz === "Kullanımı önerilmez" || 
      item.bilgi === "0 ölçek kullanın." || 
      item.bilgi === "Kullanımı önerilmez." ||
      item.bilgi === "Kullanımı önerilmez"
    ) {
      setIsNotRecommended(true); // Durum true yapıldı
      console.log(isNotRecommended);
    }
  }, [item]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };



  const handleNavigateReminder = () => {
    // Mesaj "Kullanımı önerilmez." veya "Kullanımı önerilmez" değilse devam et
    
      // Boş bir nesne oluştur
      const dataToSend = {};
      
      dataToSend.name = item.name;
      
      // item.doz, item.bilgi ve item.form değerlerini kontrol et
      if (item.doz) {
        dataToSend.kuvvet = item.doz;
      }
      
      if (item.bilgi) {
        dataToSend.kuvvet = item.bilgi; // Farklı bir anahtar kullanıyoruz
      }
      
      if (item.message) {
        dataToSend.kuvvet = item.message; // Mesajı ekliyoruz
      }
      
      if (item.ilac_form && item.ilac_form.name) { // ilac_form var mı kontrol et
        dataToSend.form = item.ilac_form.name;
      }
    

      if (user.id) {
        navigation.navigate('Hatırlatıcı Oluşturma', {dataToSend });
      } else {
        navigation.navigate('Üyelik'); // Navigate to Login if user is not logged in
      }
    
  };   

  // Reklam yükle
  useEffect(() => {
    load();
  }, [load]);

  // Reklam kapanırsa veya izlendiyse, navigasyonu gerçekleştirin
  useEffect(() => {
    if (isClosed) {
      navigation.navigate('Kullanım Talimatı', { documentUrl: item.document });
    }
  }, [isClosed]);

  const handlePress = () => {
    if (item.document) {
      if (isLoaded) {
        // Reklam yüklendiyse, göster
        show();
      } else {
        // Reklam yüklenmediği durumda doğrudan navigate et
        navigation.navigate('Kullanım Talimatı', { documentUrl: item.document });
      }
    } else {
      
      console.log('Belge bulunamadı.');
    }
  };

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.medText}>{capitalizeFirstLetter(item.name)}</Text>
          
          {item.hastaliklar && item.hastaliklar.name && (
            <Text style={styles.ingredientText}>{capitalizeFirstLetter(item.hastaliklar.name)} hastalığı için</Text>
          )}
          {item.etken_madde && (
            <Text style={styles.ingredientText}>{capitalizeFirstLetter(item.etken_madde)}</Text>
          )}
          {item.ilac_kategori && item.ilac_kategori.name && (
            <Text style={styles.ingredientText}>{capitalizeFirstLetter(item.ilac_kategori.name)}</Text>
          )}
        </View>

        <View style={styles.resultContainer}>
          {typeof result === 'string' ? (
            <Text style={styles.resultText}>{result}</Text>
          ) : (
            <>
               {isNotRecommended ? ( // isNotRecommended kontrolü
                <Text style={styles.resultText}>Kullanımı önerilmez.</Text>
              ) : (
                <>
                  {item.message && (
                    <Text style={styles.resultText}
                    >Doz Miktjarı: {item.message}{item.message.slice(-1) !== '.' ? '.' : ''}</Text>
                  )}
                  {item.kullanim_sikligi && (
                    <Text style={styles.resultText}>
                    Kullanım Sıklığı: {item.kullanim_sikligi}{item.kullanim_sikligi.slice(-1) !== '.' ? '.' : ''}
                    </Text>
                  )}
                  {item.doz && (
                    <Text style={styles.resultText}>{item.doz}{item.doz.slice(-1) !== '.' ? '.' : ''}</Text>
                  )}
                  {item.bilgi && (
                    <Text style={styles.resultText}>{item.bilgi}{item.bilgi.slice(-1) !== '.' ? '.' : ''}</Text>
                  )}
                </>
              )}
            </>
          )}
        </View>

        <View style={styles.buttonContainer2}>
          <TouchableOpacity 
            style={styles.instructionsButton} 
            onPress={handlePress}
          >
            <Text style={styles.instructionsButtonText}>Kullanım Talimatları</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.homeButton} 
            onPress={() => navigation.navigate('Ana Sayfa')}
          >
            <Text style={styles.remindersButtonText}>Ana Sayfa</Text>
          </TouchableOpacity>
          {!isNotRecommended && (
            <TouchableOpacity 
            style={isNotRecommended ? styles.remindersButtonDisable : styles.remindersButton}
            onPress={isNotRecommended ? null : handleNavigateReminder}
            >
              <Text style={styles.remindersButtonText}>Hatırlatıcı Oluştur</Text>
            </TouchableOpacity> 
          )}
        </View>
      </ScrollView>
    )
  );
};

export default NidSearchPage;
