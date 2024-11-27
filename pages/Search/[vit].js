import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';
import { colors } from '../../styles/colors';
import { useSelector } from 'react-redux';

import { useInterstitialAd, TestIds, AdEventType, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../../utils/addId';




// Sembolleri temizlemek için yardımcı fonksiyon
const cleanString = (str) => {
  return str.replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, '').trim(); // Türkçe karakterleri koruyarak sembolleri temizler
};

// Türkçe karakterleri standart hale getiren yardımcı fonksiyon
const normalizeString = (str) => {
  return str
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/Ç/g, 'C')
    .replace(/Ğ/g, 'G')
    .replace(/İ/g, 'I')
    .replace(/Ö/g, 'O')
    .replace(/Ş/g, 'S')
    .replace(/Ü/g, 'U');
};

const NidSearchPage = ({ route }) => {
  const { item } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [dataNoPagination, setDataNoPagination] = useState([]); // Search için kullanılacak veri
  const [dataPagination, setDataPagination] = useState([]); // Ana sayfa için kullanılacak veri
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Sayfa numarası
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState(null); // Bir sonraki sayfanın URL'si

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const user = useSelector((state) => state.user);

  const adUnitId =  __DEV__ ? TestIds.INTERSTITIAL : Platform.OS === 'ios' ? AddIdIos.GECİSVİTAMİNLER : AddIdAndroid.GECİSVİTAMİNLER;


  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
  });

    // Reklam yükle
    useEffect(() => {
      load();
    }, [load]);

    // Reklam kapanırsa veya izlendiyse, navigasyonu gerçekleştirin
    useEffect(() => {
      if (isClosed) {
        setModalVisible(false); // Modalı kapat
        navigate.navigate('Vitamin Bilgisi', { item: item  }); // 1, 2, 4, 7, 8 için ilaca yönlendir
       
      }
    }, [isClosed]);

  const createReminder = (item) => {
    if (user.id) {
      navigate.navigate('Hatırlatıcı Oluştur', { name: item.name });
    } else {
      navigate.navigate('Üyelik'); // Navigate to Login if user is not logged in
    }
    setModalVisible(false); // Modalı kapat
  };

  const navigateToDoseCalculation = (item) => {

    if (isLoaded) {
      // Reklam yüklendiyse, göster
      console.log("reklam yüklendi");
      show();
    } else {
      navigate.navigate('Vitamin Bilgisi', { item: item  }); // 1, 2, 4, 7, 8 için ilaca yönlendir
      setModalVisible(false); // Modalı kapat
    }
    
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };


  // Modalı açan fonksiyon
  const openModal = (item) => {
    
    setModalVisible(true); // Modalı aç3
  };

  const closeModal = () => {
    setSelectedItem(null); // selectedItem sıfırlanıyor
    setModalVisible(false); // Modal kapanıyor
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No Pagination verisini search için çekiyoruz
        const noPaginationResponse = await axios.get(
          `${API_ROUTES.PRODUCT_CATEGORY_BY_PRODUCT_NO_PAGINATIONS}${item.id}`
        );
        setDataNoPagination(noPaginationResponse.data);
        
        // İlk sayfa verisini al
        await fetchPaginationData(1); // İlk sayfayı yükle
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error fetching data');
      } finally {
       
          setLoading(false);
        
      }
    };

    fetchData(); // Verileri component mount olduğunda çekiyoruz
  }, [item.id]); // item.id değiştiğinde veriyi yeniden çeker

  const fetchPaginationData = async (pageNumber) => {
    try {
      setLoadingMore(true);
      const paginationResponse = await axios.get(
        `${API_ROUTES.PRODUCT_CATEGORY_BY_PRODUCT}${item.id}&page=${pageNumber}`
      );
      
      const newData = paginationResponse.data.results;
      setDataPagination(prevData => [...prevData, ...newData]); // Yeni verileri öncekiyle birleştir
      setNextUrl(paginationResponse.data.next); // next varsa kaydet
    } catch (error) {
      console.error('Error fetching pagination data:', error);
      Alert.alert('Error fetching pagination data');
    } finally {
      setLoadingMore(false);
    }
  };

  // Arama işlemi için filtreleme
  const filteredData = useMemo(() => {
    const cleanedSearchTerm = normalizeString(cleanString(searchTerm).toLowerCase().replace(/\s+/g, '')); // Boşlukları kaldır ve normalleştir
    return dataNoPagination.filter(dataItem => {
      const cleanedDataItemName = normalizeString(cleanString(dataItem.name).toLowerCase().replace(/\s+/g, '')); // Boşlukları kaldır ve normalleştir
      return cleanedDataItemName.includes(cleanedSearchTerm); // Temizlenmiş veriyi arama terimi ile karşılaştır
    });
  }, [dataNoPagination, searchTerm]);

  const handleSearchInput = text => {
    setSearchTerm(text);
    setIsSearching(text.length > 0);
    
    // Arama kutusu temizlendiğinde pagination verilerine geri dön
    if (text.length === 0) {
      setPage(1); // Sayfa numarasını sıfırla
      setDataPagination([]); // Pagination verilerini temizle
      fetchPaginationData(1); // İlk sayfayı yeniden yükle
    }
  };

  const navigate = useNavigation();
 
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item); // Seçilen item'ı state'e kaydet
        setModalVisible(true); // Modalı aç
      }} 
    >
      <View style={styles.medicineItem}>
        <View style={styles.medicineContent}>
          <Text style={styles.medicineName}>{capitalizeFirstLetter(item.name)}</Text>
          <Ionicons name="chevron-forward-outline" size={colors.iconHeight} color={colors.text}/>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    if (!loadingMore && nextUrl) { // Eğer yeni sayfa varsa ve veri yüklenmiyorsa
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchPaginationData(nextPage); // Yeni sayfayı yükle
        return nextPage;
      });
    }
  };

  const CustomModal = ({ visible, onClose, item, onNavigateToDoseCalculation, onCreateReminder }) => (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose} // Geri tuşuna basılınca modal kapansın
    >
      <TouchableOpacity style={styles.modalBackground} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          <Text style={styles.modalTitle}>Ne yapmak istersiniz?</Text>
          <TouchableOpacity style={styles.button} onPress={() => onNavigateToDoseCalculation(item)}>
            <Text style={styles.buttonText}>Doz Hesaplama</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecond} onPress={() => onCreateReminder(item)}>
            <Text style={styles.buttonText}>Hatırlatıcı Oluştur</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <View style={styles.container}>
     
      {/* Arama Kutusu */}
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Ara..."
          value={searchTerm}
          onChangeText={handleSearchInput}
          onFocus={() => setIsSearching(true)}
          onSubmitEditing={() => setIsSearching(false)}
        />
      </View>

      <CustomModal 
        visible={modalVisible} 
        onClose={closeModal} 
        item={selectedItem} // selectedItem'ı geçiyoruz
        onNavigateToDoseCalculation={navigateToDoseCalculation} 
        onCreateReminder={createReminder} 
      />

      {/* Eğer arama aktifse filtrelenmiş veriyi göster, değilse pagination verisini göster */}
      <FlatList
        keyboardShouldPersistTaps="always"
        style={styles.searchResultsContainer}
        data={isSearching ? filteredData : dataPagination} // Arama aktifse filtrelenmiş veriyi göster
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore} // Yeni sayfa yüklemek için
        onEndReachedThreshold={0.5} // Yükleme eşiği
        ListFooterComponent={loadingMore ?  <ActivityIndicator size="small" color={colors.uygulamaRengi} />  : null} // Daha fazla yükleniyor mesajı
        showsVerticalScrollIndicator={false}
      />
    </View>
    )
  );
};

export default NidSearchPage;