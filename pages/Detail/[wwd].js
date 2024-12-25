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
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();
 
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  

  const adUnitId =  __DEV__ ? TestIds.INTERSTITIAL : Platform.OS === 'ios' ? AddIdIos.GECİSPDF : AddIdAndroid.GECİSPDF;

  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERWWD : AddIdAndroid.BANNERWWD;



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
                <Text style={styles.buttonTextModal}>Ne için kullanılır</Text>
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

  

   

  // Reklam yükle
  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
      if(item){
        
          setLoading(false);
      }
    }, [item]);

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
          <Text style={styles.medText}>{capitalizeFirstLetter(item.baslik)}</Text>
          
         
        </View>
        
        <View style={styles.resultContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.resultText}>
              {item.newTitle === 'Nedir' ? item.nedir : item.newTitle === 'Ne için kullanılır?' ? item.ne_icin_kullanilir : null}
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
