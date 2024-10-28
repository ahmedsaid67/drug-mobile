import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity,Dimensions } from 'react-native';
import styles from '../styles/BildirimlerStyles';
import { API_ROUTES } from '../utils/constant';
import axios from 'axios';
import { colors } from '../styles/colors';
import NoNotifications from '../components/NoNotifications';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons import edildi
import AlertModal from '../components/AlertModal';

function Bildirimler() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more data is available
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.login.success);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const { height } = Dimensions.get('window');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);

    // 500 milisaniye gecikmeli olarak uyarıyı göster
    setTimeout(() => {
        setAlertVisible(true);
    }, 400); // 500 milisaniye = 0.5 saniye
  };

  useEffect(() => {
    if (loginStatus) {
      fetchNotifications();
    } else {
      navigation.navigate('Üyelik');
    }
  }, [page]); // Fetch notifications whenever the page changes
  
  const fetchNotifications = async () => {
    if (!hasMore) return; // Exit if there's no more data to fetch

    setLoading(true); // Start loading
    if(error){
      setError(false);
    }
    try {
      const response = await axios.get(`${API_ROUTES.NOTIFICATIONS_USER_LIST}?page=${page}`);
      const newNotifications = response.data.results;

      // Update state with new notifications
      setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
      setHasMore(response.data.next !== null);
      
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleEndReached = () => {
    // Handle end reached event only if loading is false and there are more notifications
    if (!loading && hasMore && notifications.length > 0) {
      setPage(prevPage => prevPage + 1); // Load the next page
    }
  };


  // Panoya kopyalama fonksiyonu
  const copyToClipboard = (explanations, tarih, saat) => {
    const formattedTime = saat.split(':').slice(0, 2).join(':'); 
    const formattedDate = tarih.split('-').reverse().join('.');
    
    // İstenilen formatta metin oluşturulması
    const textToCopy = `Hatırlatma (${formattedDate} - ${formattedTime}):\n${explanations}`;
    
    Clipboard.setString(textToCopy);
    
    // Türkçe alert mesajı
    showAlert('Başarılı', 'Bildirim başarıyla panoya kopyalandı!');

  };


  const renderNotification = ({ item }) => {
    const formattedTime = item.saat.split(':').slice(0, 2).join(':'); 
    const formattedDate = item.tarih.split('-').reverse().join('.');
    return (
      <View key={item.id} style={styles.notificationCard}>
        <View style={styles.notificationContent}>
            <Text style={styles.description}>{item.explanations}</Text>
            <Text style={styles.date}>{formattedDate} - {formattedTime}</Text> 
        </View>
        <TouchableOpacity style={styles.iconContainer}  onPress={() => copyToClipboard(item.explanations, item.tarih, item.saat)}>
            <Icon name="copy-outline" size={colors.iconHeight} color={colors.uygulamaRengi} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderLoader = () => {
    return (
      loading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size={colors.iconHeight} color={colors.uygulamaRengi} />
        </View> : null
    );
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: height * 0.025 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={!loading && !error ? <NoNotifications /> : null}
          ListFooterComponent={renderLoader} 
        />
      </View>
      <AlertModal
        isVisible={alertVisible}
        message={alertMessage}
        title={alertTitle}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}

export default Bildirimler;



