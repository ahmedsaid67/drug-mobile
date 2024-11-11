import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'; // ActivityIndicator import eklendi
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';
import { useInterstitialAd, TestIds, AdEventType, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../../utils/addId';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [data, setData] = useState(null); // Gelen veriyi duruma kaydetmek için null ile başlattık
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 
  const user = useSelector((state) => state.user);

  const adUnitId = __DEV__ || Platform.OS === 'ios'  ? TestIds.INTERSTITIAL : AddIdIos.GECİSVİTAMİNLER|| Platform.OS === 'android' ? TestIds.INTERSTITIAL : AddIdAndroid.GECİSVİTAMİNLER;

  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
  });


  const bannerId =  __DEV__ || Platform.OS === 'ios'  ? TestIds.BANNER : AddIdIos.BANNERVİTAMİNLER|| Platform.OS === 'android' ? TestIds.BANNER : AddIdAndroid.BANNERVİTAMİNLER;

  // Reklam yükle
  useEffect(() => {
    const showAd = () => {
      if (isLoaded && !isClosed) { // Reklam yüklendi ve kapatılmadıysa
        console.log("yüklendi vitamin");
        show();
      } else {
        console.log("yüklenmedi vitamin");
      }
    };

    load();
    showAd(); // Reklamı gösterme kontrolü
  }, [load, isLoaded, isClosed]); // isLoaded ve isClosed bağımlılıkları eklendi


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.GET_SUPPLEMENT}${item.id}`);
          console.log(response.data);
          setData(response.data); // Gelen veriyi duruma kaydet
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);
      } finally {
       
        setLoading(false); 
      }
    };
  
    fetchData();
  }, [item]);

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {data ? (
      <>
      <View style={styles.infoContainer}>
        {/* Ürün adı */}
        <Text style={styles.medText}>{data.name}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{data.explanation}</Text>
      </View>

      <View style={styles.adContainer}>
        <BannerAd
            unitId={bannerId}
            size={"375x100"}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
              keywords: keywords.healthcare,
            }}
        />
      </View>


      <View style={styles.buttonContainer}>
      <TouchableOpacity 
          style={styles.instructionsButton} 
          onPress={() => {
            
            if (user.id) {
              navigation.navigate('Hatırlatıcı Oluştur', { name: item.name });
            } else {
              navigation.navigate('Üyelik'); // Navigate to Login if user is not logged in
            }
          }}
        >
          <Text style={styles.remindersButtonText}>Hatırlatıcı Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.remindersButton} 
          onPress={() => {
            if (data.satin_al_link) {
              // Eğer satin_al_link mevcutsa, kullanıcıyı o linke yönlendir
              Linking.openURL(data.satin_al_link).catch(err => console.error('Link açılamadı:', err));
            } else {
              console.log('Satın alma bağlantısı mevcut değil.');
            }
          }}
        >
          <Text style={styles.instructionsButtonText}>Şimdi Satın Al</Text>
        </TouchableOpacity>
      </View>


      </>
      ) : (
        <Text>Veriler yükleniyor...</Text> 
      )}
    </ScrollView>
    )
  );
};

export default NidSearchPage;
