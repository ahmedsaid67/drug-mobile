import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import styles from '../styles/BildirimlerStyles';
import { API_ROUTES } from '../utils/constant';
import axios from 'axios';
import { colors } from '../styles/colors';
import NoNotifications from '../components/NoNotifications';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function Bildirimler() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more data is available
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.login.success);

  useEffect(() => {
    if (loginStatus){
      fetchNotifications();
    }else{
      navigation.navigate('Login')
    }
  }, [page]); // Fetch notifications whenever the page changes
  

  const fetchNotifications = async () => {
    if (!hasMore) return; // Exit if there's no more data to fetch

    setLoading(true); // Start loading
    if(error){
      setError(false)
    }
    try {
      const response = await axios.get(`${API_ROUTES.NOTIFICATIONS_USER_LIST}?page=${page}`);
      const newNotifications = response.data.results;

      // Update state with new notifications
      setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
      setHasMore(response.data.next !== null);
      
    } catch (err) {
      // console.log(err);
      setError(true)
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
  

  const renderNotification = ({ item }) => {
    const formattedTime = item.saat.split(':').slice(0, 2).join(':'); 
    const formattedDate = item.tarih.split('-').reverse().join('.');
    return (
      <View key={item.id} style={styles.notificationCard}>
        <Text style={styles.description}>{item.explanations}</Text>
        <Text style={styles.date}>{formattedDate} - {formattedTime}</Text> 
      </View>
    );
  };
  

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={!loading && !error ? <NoNotifications /> : null}
          ListFooterComponent={loading ? <ActivityIndicator size="small" color={colors.uygulamaRengi}  /> : null} 
        />
      </View>
    </View>
  );
}

export default Bildirimler;



