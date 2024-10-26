import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { useInterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();

  const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  const handleNavigateReminder = () => {
    const handleNavigateReminder = () => {
      // Mesaj ve diğer koşulları kontrol et
      if (
        item.message !== "Kullanımı önerilmez." ||
        item.message !== "Kullanımı önerilmez"
      ) {
        // Boş bir nesne oluştur
        const dataToSend = {};
    
        dataToSend.name = item.name;
    
        // item.doz, item.bilgi ve item.form değerlerini kontrol et
        if (item.doz) {
          dataToSend.kuvvet = item.doz;
        }
        
        if (item.bilgi) {
          dataToSend.bilgi = item.bilgi; // Farklı bir anahtar kullanıyoruz
        }
      
        if (item.message) {
          dataToSend.message = item.message; // Mesajı ekliyoruz
        }
        
        if (item.ilac_form && item.ilac_form.name) { // ilac_form var mı kontrol et
          dataToSend.form = item.ilac_form.name;
        }
      
        // Navigasyonu gerçekleştir
        navigation.navigate('Hatırlatıcı Oluşturma', {
          dataToSend
        });
      }
    };    
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
          <Text style={styles.medText}>{item.name} id {item.id}</Text>
          
          {item.hastaliklar && item.hastaliklar.name && (
            <Text style={styles.ingredientText}>{item.hastaliklar.name} hastalığı için</Text>
          )}
          {item.etken_madde && (
            <Text style={styles.ingredientText}>{item.etken_madde}</Text>
          )}
          {item.ilac_kategori && item.ilac_kategori.name && (
            <Text style={styles.ingredientText}>{item.ilac_kategori.name}</Text>
          )}
        </View>

        <View style={styles.resultContainer}>
          {typeof result === 'string' ? (
            <Text style={styles.resultText}>{result}</Text>
          ) : (
            <>
              {item.message && (
                <Text style={styles.resultText}
                >Doz Miktarı: {item.message}{item.message.slice(-1) !== '.' ? '.' : ''}</Text>
              )}
              {item.message !== "Kullanımı önerilmez." && item.message !== "Kullanımı önerilmez." && item.kullanim_sikligi && (
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
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.instructionsButton} 
            onPress={handlePress}
          >
            <Text style={styles.instructionsButtonText}>Kullanım Talimatları</Text>
          </TouchableOpacity>

          <TouchableOpacity 
             style={item.message === "Kullanımı önerilmez." || item.message === "Kullanımı önerilmez" ? styles.remindersButton : styles.remindersButtonDisable}
            onPress={handleNavigateReminder}
          >
            <Text style={styles.remindersButtonText}>Hatırlatıcı Oluştur</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  );
};

export default NidSearchPage;
