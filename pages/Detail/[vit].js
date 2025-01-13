import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Modal } from 'react-native'; // ActivityIndicator import eklendi
import styles from '../../styles/MedicineStyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';
import { TestIds,  BannerAd } from 'react-native-google-mobile-ads'

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../../utils/addId';
import Ionicons from 'react-native-vector-icons/Ionicons';;


const NidSearchPage = ({ route }) => {
  const { item } = route.params; // Get selected item
  const [data, setData] = useState(null); // Gelen veriyi duruma kaydetmek için null ile başlattık
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); 
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);


  useFocusEffect(
    React.useCallback(() => {
      // Reset modal state when screen comes into focus
      closeModal();
    }, [])
  );


  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERVİTAMİNLER : AddIdAndroid.BANNERVİTAMİNLER;
  const closeModal = () => {
    setModalVisible(false); 
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
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

        
            <TouchableOpacity 
            style={styles.buttonModal}
            onPress={() => {
              onClose();
              if (user.id) {
                navigation.navigate('Hatırlatıcı Oluştur', { name: data.name });
              } else {
                navigation.navigate('Üyelik');
              }
            }}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="notifications-outline" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Hatırlatıcı Oluştur</Text>
              </View>
            </TouchableOpacity>

            {data.satin_al_link  &&(
            <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
              onClose();
              Linking.openURL(data.satin_al_link);
            }}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="link" style={styles.iconSmall}/>
                <Text style={styles.buttonTextModal}>Ürüne Git</Text>
              </View>
            </TouchableOpacity>
           )}

          
        
         
            {data.nedir && data.nedir !== "nan" &&(
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
          {data.ne_icin_kullanilir && data.ne_icin_kullanilir !== "nan" && (
            <TouchableOpacity
              style={styles.buttonModal}
              onPress={() => {
                onClose();
                navigateInfo("ne için");
              }}
            >
              <View style={styles.iconTextContainer}>
                <Ionicons name="information-circle-outline" style={styles.iconSmall} />
                <Text style={styles.buttonTextModal}>Ne için kullanır / Sağlık beyanı</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
                onClose();
                navigation.navigate('Ana Sayfa');
              }
            }
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
        ...data,
        newTitle: "Nedir", // Yeni bir alan ekle
      };
  
      // Yeni item ile 'Bilgi' ekranına git
      setModalVisible(false); // Modal'ı kapat
      navigation.navigate("Kullanım Bilgisi", { item: updatedItem });
    } else if (string === "ne için") {
      const updatedItem = {
        ...data,
        newTitle: "Ne için kullanılır?", // Yeni bir başlık
      };
  
      // Yeni item ile 'Bilgi' ekranına git
      setModalVisible(false); // Modal'ı kapat
      navigation.navigate("Kullanım Bilgisi", { item: updatedItem });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (item && item.id) {
          const response = await axios.get(`${API_ROUTES.GET_SUPPLEMENT}${item.id}`);
          console.log(`${API_ROUTES.GET_SUPPLEMENT}${item.id}`);
          setData(response.data); // Gelen veriyi duruma kaydet
        }
      } catch (error) {
        console.error('API isteği sırasında hata oluştu:', error);

        console.log(error.response.data);
      } finally {
       
        setLoading(false); 
      }
    };
  
    fetchData();
  }, [item]);

  const removeQuotes = (text) => {
    if (!text) return '';
    return text
      .replace(/[“”"]/g, '')  // Remove all types of quotes
      .trim()
      .replace(/[^a-zA-Z0-9üÜğĞışİŞçÇöÖ\s]+$/, '')  // Remove special chars at end except period
      .replace(/\.+$/, '.')  // Replace multiple periods with single
      .replace(/[^.]\s*$/, match => match.trim() + '.'); // Add period if missing
  };


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
        <Text style={styles.medText}>{capitalizeFirstLetter(data.name)}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{removeQuotes(data.explanation)}</Text>
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


      </>
      ) : (
        <Text>Veriler yükleniyor...</Text> 
      )}
    </ScrollView>
    )
  );
};

export default NidSearchPage;
