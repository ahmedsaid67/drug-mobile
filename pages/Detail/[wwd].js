import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator,Modal } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { useInterstitialAd, TestIds, AdEventType, BannerAd , BannerAdSize} from 'react-native-google-mobile-ads'
import Ionicons from 'react-native-vector-icons/Ionicons';;
import { useSelector } from 'react-redux';

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../../utils/addId';



const NidwwdPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();
  const [isNotRecommended, setIsNotRecommended] = useState(false); // Yeni durum eklendi
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  

  const adUnitId =  __DEV__ ? TestIds.INTERSTITIAL : Platform.OS === 'ios' ? AddIdIos.GECİSPDF : AddIdAndroid.GECİSPDF;

  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERILAC : AddIdAndroid.BANNERILAC;



  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
    
  });




  const closeModal = () => {
    setModalVisible(false); // Modal kapanıyor
  };


  const CustomModal = ({ visible, onClose }) => (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose} // Geri tuşuna basılınca modal kapansın
    >
     <TouchableOpacity style={styles.modalBackgroundSecond} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>

        {!isNotRecommended && (
            <TouchableOpacity 
            style={styles.buttonModal}
            onPress={isNotRecommended ? null : handleNavigateReminder}
            >
              <Text style={styles.buttonTextModal}>Hatırlatıcı Oluştur</Text>
            </TouchableOpacity>)}
            
          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={handlePress}
          >
            <Text style={styles.buttonTextModal}>Kullanım Talimatları</Text>
          </TouchableOpacity>

        
          
          
          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => navigation.navigate('Ana Sayfa')}
          >
            <Text style={styles.buttonTextModal}>Ana Sayfa</Text>
          </TouchableOpacity>
          
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
    
  );

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
      setModalVisible(false);
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
        console.log("reklam yüklendi");
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
          <Text style={styles.medText}>{capitalizeFirstLetter(item.name)} {capitalizeFirstLetter(item.newTitle)}</Text>
          
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
                    >Doz Miktarı: {item.message}{item.message.slice(-1) !== '.' ? '.' : ''}</Text>
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

          <CustomModal 
            visible={modalVisible} 
            onClose={closeModal} 
          />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calculateButton}>
            <Text style={styles.buttonText}>Seçenekler</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  );
};

export default NidwwdPage;
