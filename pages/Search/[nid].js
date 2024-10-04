import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/SearchPageStyles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_ROUTES } from '../../utils/constant';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // No Pagination verisini search için çekiyoruz
        const noPaginationResponse = await axios.get(
          `${API_ROUTES.MEDICINE_FORM_NO_PAGINATIONS}${item.id}`
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
        `${API_ROUTES.MEDICINE_FORM_PAGINATIONS}${item.id}&page=${pageNumber}`
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
  const filteredData = dataNoPagination.filter(dataItem =>
    dataItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInput = text => {
    setSearchTerm(text);
    setIsSearching(text.length > 0);
  };

  const navigate = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        // hastaliklar dizisinin dolu olup olmadığını kontrol et
        if (item.hastaliklar && item.hastaliklar.length > 0) {
          navigate.navigate('SicknessDetail', { item }); // hastalık varsa buraya yönlendirilir
        } else {
          navigate.navigate('MedicineDetail', { item }); // hastalık yoksa ilaca yönlendirilir
        }
      }}
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

  if (loading) {
    return <Text>Loading...</Text>; // Veriler yüklenirken gösterilecek loading mesajı
  }

  return (
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
  );
};

export default NidSearchPage;
