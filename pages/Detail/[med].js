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



const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();
  const [isNotRecommended, setIsNotRecommended] = useState(false);
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  

  const adUnitId =  __DEV__ ? TestIds.INTERSTITIAL : Platform.OS === 'ios' ? AddIdIos.GECİSPDF : AddIdAndroid.GECİSPDF;

  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERILAC : AddIdAndroid.BANNERILAC;



  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
    // Add content filtering
    contentRating: ['G', 'PG'],
    // Yasaklı kategoriler
    restrictedCategories: keywords.restrictedCategories,
    // Ek kısıtlamalar
    tag: 'health_wellness',
    maxAdContentRating: 'G',
    // Belirli ağlar veya reklam türlerini engelle
    blockedNetworks: [
        'gambling_network_1', 'adult_network_1', 'app_download_network', 'alcohol_network'
    ],
    // Reklam türü kısıtlamaları
    preventAppDownloadAds: true,
    // Sıkı reklam inceleme ve onay
    adReviewRequired: true,
    // Otomatik filtreleme sistemi
    autoAdFiltering: true,
    // Dinamik/kullanıcı tarafından oluşturulan içerikleri engelle
    blockDynamicAds: true
    
  });


  const closeModal = () => {
    setModalVisible(false); 
  };


  const CustomModal = ({ visible, onClose }) => (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose} 
    >
     <TouchableOpacity style={styles.modalBackgroundSecond} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>

        {!isNotRecommended && (
            <TouchableOpacity 
            style={styles.buttonModal}
            onPress={isNotRecommended ? null : handleNavigateReminder}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="notifications-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Hatırlatıcı Oluştur</Text>
              </View>
            </TouchableOpacity>
          )}
        
         {item.document && (
            <TouchableOpacity 
              style={styles.buttonModal} 
              onPress={handlePress}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="document-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Kullanım Talimatları</Text>
              </View>
            </TouchableOpacity>
            
            )}
            {item.nedir && item.nedir !== "nan" && (
            <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
              onClose();
              navigateInfo("nedir");
            }}
          >
             <View style={styles.iconTextContainer}>
                <Ionicons name="help-circle-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Nedir?</Text>
              </View>
          </TouchableOpacity>
           )}
          {item.ne_icin_kullanilir && item.ne_icin_kullanilir !== "nan" && ( 
          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
              onClose();
              navigateInfo("ne için");
            }}
          >
            <View style={styles.iconTextContainer}>
                <Ionicons name="information-circle-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Ne için kullanır?</Text>
              </View>
            </TouchableOpacity>
            )}
          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
              onClose();
              navigation.navigate('Ana Sayfa');
            }}
          >
             <View style={styles.iconTextContainer}>
                <Ionicons name="home-outline" style={styles.iconSmall}/>
                
              <Text style={styles.buttonTextModal}>Ana Sayfa</Text>
              </View>
          </TouchableOpacity>
          
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
    
  );

  const navigateInfo = (string) => {
    
  
    // Gelen string'e göre güncellenmiş item'i oluştur
    if (string === "nedir") {
      const updatedItem = {
        ...item, // Mevcut tüm verileri koru
        newTitle: "Nedir", // Yeni bir alan ekle
        bilgiEkstra: "Bu nedir başlığı altındaki bilgiler", // İkinci yeni alan
      };
  
      // Yeni item ile 'Bilgi' ekranına git
      setModalVisible(false); // Modal'ı kapat
      navigation.navigate("Bilgi", { item: updatedItem });
    } else if (string === "ne için") {
      const updatedItem = {
        ...item,
        newTitle: "Ne için kullanılır?", // Yeni bir başlık
        bilgiEkstra: "Bu kullanım amacı bilgileri", // İkinci yeni alan
      };
  
      // Yeni item ile 'Bilgi' ekranına git
      setModalVisible(false); // Modal'ı kapat
      navigation.navigate("Bilgi", { item: updatedItem });
    }
  };
  




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
    console.log(isNotRecommended);
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
        if(item.hassasiyet_turu.id === 7){
          navigation.navigate('Hatırlatıcı Oluştur', { name: item.name });
        }
        else{
          navigation.navigate('Hatırlatıcı Oluşturma', {dataToSend });
        }
        
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

  useEffect(() => {
    if(item){
      
        setLoading(false);
    }
  }, [item]);

  const handlePress = async () => {
    setModalVisible(false);
    if (item.document) {
      if (isLoaded) {
        try {
          // Reklam bilgilerini kontrol et
          const adInfo = await show();
          
          // Reklam kısıtlamalarını kontrol et
          const isAdAppropriate = () => {
            if (!adInfo || !adInfo.contentRating) {
              return false;
            }

            const isValidRating = ['G', 'PG'].includes(adInfo.contentRating);
            const isValidCategory = !['gambling', 'betting', 'casino'].some(
              category => adInfo.categories?.includes(category)
            );
            const isValidNetwork = !['gambling_network_1', 'adult_network_1', 'app_download_network'].some(
              network => adInfo.network === network
            );
            const isNotAppDownload = !(adInfo.type === 'app_download');

            return isValidRating && isValidCategory && isValidNetwork && isNotAppDownload;
          };

          if (!isAdAppropriate()) {
            console.log("Uygun reklam bulunamadı, direkt yönlendiriliyor");
            navigation.navigate('Kullanım Talimatı', { documentUrl: item.document });
          } else {
            console.log("Uygun reklam bulundu, gösteriliyor");
          }
        } catch (error) {
          console.log("Reklam gösteriminde hata:", error);
          navigation.navigate('Kullanım Talimatı', { documentUrl: item.document });
        }
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
                    >Doz Miktarı: {item.message.trimEnd().replace(/\.+$/, '')}.</Text>
                  )}
                  {item.kullanim_sikligi && (
                    <Text style={styles.resultText}>
                    Kullanım Sıklığı: {item.kullanim_sikligi.trimEnd().replace(/\.+$/, '')}.
                    </Text>
                  )}
                  {item.doz && (
                    <Text style={styles.resultText}>{item.doz.trimEnd().replace(/\.+$/, '')}.</Text>
                  )}
                  {item.bilgi && (
                    <Text style={styles.resultText}>{item.bilgi.trimEnd().replace(/\.+$/, '')}.</Text>
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
                  // Add content filtering
                  contentRating: ['G', 'PG'],
                  // Yasaklı kategoriler
                  restrictedCategories: keywords.restrictedCategories,
                  // Ek kısıtlamalar
                  tag: 'health_wellness',
                  maxAdContentRating: 'G',
                  // Belirli ağlar veya reklam türlerini engelle
                  blockedNetworks: [
                      'gambling_network_1', 'adult_network_1', 'app_download_network', 'alcohol_network'
                  ],
                  // Reklam türü kısıtlamaları
                  preventAppDownloadAds: true,
                  // Sıkı reklam inceleme ve onay
                  adReviewRequired: true,
                  // Otomatik filtreleme sistemi
                  autoAdFiltering: true,
                  // Dinamik/kullanıcı tarafından oluşturulan içerikleri engelle
                  blockDynamicAds: true
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

export default NidSearchPage;
