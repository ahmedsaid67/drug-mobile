import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';
import { colors } from '../../styles/colors';

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

  const createReminder = () => {
    console.log('Hatırlatıcı oluşturulacak.');
    setModalVisible(false); // Modalı kapat
  };

  const navigateToDoseCalculation = () => {
    navigate.navigate('VitDetail', { item: selectedItem  }); // 1, 2, 4, 7, 8 için ilaca yönlendir
    setModalVisible(false); // Modalı kapat
  };


  // Modalı açan fonksiyon
  const openModal = (item) => {
    setSelectedItem(item); // Tıklanan item'i state'e kaydet
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
        setTimeout(() => {
          setLoading(false);
        }, 1211);
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
      onPress={() => openModal(item)} // Modalı açmak ve item'i iletmek için
    >
      <View style={styles.medicineItem}>
        <View style={styles.medicineContent}>
          <Text style={styles.medicineName}>{item.name}</Text>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </View>
        <Text style={styles.activeIngredient}>{item.activeIngredient}</Text>
        <View style={styles.divider} />
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

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal} // Geri tuşuna basılınca modal kapansın
      >
        <TouchableOpacity style={styles.modalBackground} onPress={closeModal} activeOpacity={1}>
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <Text style={styles.modalTitle}>Ne yapmak istersiniz?</Text>
            <TouchableOpacity style={styles.button}  onPress={navigateToDoseCalculation}>
              <Text style={styles.buttonText}>Doz Hesaplama</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={createReminder}>
              <Text style={styles.buttonText}>Hatırlatıcı Oluştur</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Eğer arama aktifse filtrelenmiş veriyi göster, değilse pagination verisini göster */}
      <FlatList
        style={styles.searchResultsContainer}
        data={isSearching ? filteredData : dataPagination} // Arama aktifse filtrelenmiş veriyi göster
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore} // Yeni sayfa yüklemek için
        onEndReachedThreshold={0.5} // Yükleme eşiği
        ListFooterComponent={loadingMore ? <Text>Loading more...</Text> : null} // Daha fazla yükleniyor mesajı
      />
    </View>
    )
  );
};

export default NidSearchPage;