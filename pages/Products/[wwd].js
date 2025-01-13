import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator,Modal } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import { useInterstitialAd, TestIds, BannerAd } from 'react-native-google-mobile-ads'
import Ionicons from 'react-native-vector-icons/Ionicons';;
import { useSelector } from 'react-redux';

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../../utils/addId';



const NidwwdPage = ({ route }) => {
  const { item } = route.params; 
  console.log("gelen veriler")
  console.log(item);
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();
 
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  

  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERWWDVIT : AddIdAndroid.BANNERWWDVIT;



  const removeQuotes = (text) => {
    if (!text) return '';
    return text
      .replace(/[“”"]/g, '')  // Remove all types of quotes
      .trim()
      .replace(/[^a-zA-Z0-9üÜğĞışİŞçÇöÖ\s]+$/, '')  // Remove special chars at end except period
      .replace(/\.+$/, '.')  // Replace multiple periods with single
      .replace(/[^.]\s*$/, match => match.trim() + '.'); // Add period if missing
  };



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


            {item.newTitle !== 'Nedir' &&  item.nedir &&(
            <TouchableOpacity 
              style={styles.buttonModal} 
              onPress={() => navigateInfo("nedir")}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="help-circle-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Nedir?</Text>
              </View>
            </TouchableOpacity>
          )}

          {item.newTitle !== 'Ne için kullanılır?' && item.ne_icin_kullanilir && (
            <TouchableOpacity 
              style={styles.buttonModal} 
              onPress={() => navigateInfo("ne için")}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="information-circle-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Ne için kullanır / Sağlık beyanı</Text>
              </View>
            </TouchableOpacity>
          )}


        
          
          
          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => navigation.navigate('Ana Sayfa')}
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

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


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
      navigation.navigate("Kullanım Bilgisi", { item: updatedItem });
    } else if (string === "ne için") {
      const updatedItem = {
        ...item,
        newTitle: "Ne için kullanılır?", // Yeni bir başlık
        bilgiEkstra: "Bu kullanım amacı bilgileri", // İkinci yeni alan
      };
  
      // Yeni item ile 'Bilgi' ekranına git
      setModalVisible(false); // Modal'ı kapat
      navigation.navigate("Kullanım Bilgisi", { item: updatedItem });
    }
  };


  useEffect(() => {
      if(item){
        
          setLoading(false);
      }
    }, [item]);

  

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.medText}>
            
            {item.newTitle === 'Nedir' ? ' Nedir?' : item.newTitle === 'Ne için kullanılır?' ? 'Ne için kullanır / Sağlık beyanı' : ''}
          </Text>
        </View>
        
        <View style={styles.resultContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.resultText}>
              {item.newTitle === 'Nedir' ? removeQuotes(item.nedir) : item.newTitle === 'Ne için kullanılır?' ? removeQuotes(item.ne_icin_kullanilir) : null}
            </Text>
           
          </ScrollView>
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

        
      </ScrollView>
    )
  );
};

export default NidwwdPage;
