import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Modal, Alert, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'moment/locale/tr';
import { colors } from '../styles/colors';
import axios from 'axios';
import { API_ROUTES } from '../utils/constant';
import { useNavigation } from '@react-navigation/native';
import NoReminders from '../components/NoReminder';
import styles from '../styles/HatirlaticilarStyles';
import HatirlaticiYonetModel from '../components/HatirlaticiYonetModel';
import { useSelector } from 'react-redux';
import { tr } from 'date-fns/locale';


const Hatirlaticilar = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.login.success);


  moment.locale('tr');

  const screenWidth = Dimensions.get('window').width;

  const handlePress = () => {
    navigation.replace('ReminderSearch');
  };

  
  const getDates = () => {
    let dates = [];
    for (let i = -30; i <= 30; i++) {
      dates.push(moment().add(i, 'days').format('YYYY-MM-DD'));
    }
    return dates;
  };

  const dates = getDates();

  useEffect(() => {
    const todayIndex = dates.findIndex(date => date === selectedDate);
    const itemWidth = 60;
    const marginHorizontal = 20;
    const totalItemWidth = itemWidth + marginHorizontal;
    const offset = (todayIndex * totalItemWidth) - (screenWidth / 2) + (totalItemWidth / 2);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  }, [selectedDate]);

  const isToday = selectedDate === moment().format('YYYY-MM-DD');
  const todayLabel = isToday 
    ? `Bugün ${moment(selectedDate).format('D MMMM')}` 
    : moment(selectedDate).format('D MMMM');

  useEffect(() => {
    const fetchData = async () => {
      if (hasMore) {
        setLoading(true);
        if(error){
          setError(false)
        }
        try {
          const response = await axios.get(API_ROUTES.USER_REMINDER_ACTİVE, {
            params: {
              date: selectedDate,
              page: page
            }
          });
          
          setReminders(prevReminders => [...prevReminders, ...response.data.results]);
          setHasMore(response.data.next !== null);
        } catch (error) {
          // console.error("Error fetching reminders:", error);
          setError(true)
        } finally {
          setLoading(false);
        }        
      }
    };
    if (loginStatus){
      fetchData();
    }else{
      navigation.navigate('Login')
    }

    
  }, [page]);

  const fetchDataSelected = async (date) => {
    setLoading(true);
    if(error){
      setError(false)
    }
    setReminders([]);
    setPage(1);
    try {
      const response = await axios.get(API_ROUTES.USER_REMINDER_ACTİVE, {
        params: {
          date: date,
          page: 1
        }
      });
      setReminders(response.data.results);
      setHasMore(response.data.next !== null);
    } catch (error) {
      // console.error("Error fetching reminders:", error);
      setError(true)
    } finally {
      setLoading(false);
    }        
  }

  
  const renderReminder = ({ item }) => {
    const startDate = moment(item.baslangic_tarihi).startOf('day');
    const endDate = moment(item.bitis_tarihi).endOf('day');
    
    const formattedStartDate = startDate.format('D MMMM');
    const formattedEndDate = endDate.format('D MMMM');
  
    return (
      <View style={styles.reminderContainer}>
        <View style={styles.reminderContent}>
          <Icon name="medkit" size={24} color={colors.uygulamaRengi}/>
          <View style={styles.reminderTextContainer}>
            <Text style={styles.reminderText}>{item.name}</Text>
            <Text style={styles.reminderDetails}>
              {item.hatirlatici_saat.map((time, index) => (
                <Text key={index}>
                  {moment(time.saat, 'HH:mm:ss').format('HH:mm')}
                  {index < item.hatirlatici_saat.length - 1 ? ' - ' : ''}
                </Text>
              ))}
            </Text>
            <Text style={styles.reminderDetails}>
              {startDate.isSame(endDate, 'day') 
                ? formattedStartDate 
                : `${formattedStartDate} - ${formattedEndDate}`}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => { setSelectedReminder(item); setModalVisible(true); }}>
          <Icon name="trash" size={24} color={colors.deleteIcon} style={styles.reminderIcon} />
        </TouchableOpacity>
      </View>
    );
};

  const handleEndReached = () => {
    if (hasMore && !loading && reminders.length>0) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {dates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[ 
                styles.dateContainer,
                date === selectedDate ? styles.selectedDate : null,
              ]}
              onPress={() => {
                setSelectedDate(date);
                fetchDataSelected(date);
              }}
            >
              <Text style={[ 
                styles.dateText,
                date === selectedDate ? styles.selectedDateText : null,
              ]}>
                {moment(date).format('DD')}
              </Text>
              <Text style={[ 
                styles.dayText,
                date === selectedDate ? styles.selectedDateText : null,
              ]}>
                {moment(date).format('ddd')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={[styles.todayLabel, { color: isToday ? colors.uygulamaRengi : colors.text }]}>{todayLabel}</Text>
      </View>

      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={!loading && !error ? <NoReminders /> : null}
        ListFooterComponent={loading ? <ActivityIndicator size="small" color={colors.uygulamaRengi} /> : null}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={handlePress}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {selectedReminder?.id && (
        <HatirlaticiYonetModel modalVisible={modalVisible} setModalVisible={setModalVisible} setSelectedReminder = {setSelectedReminder} 
        selectedReminder={selectedReminder} setReminders={setReminders} />
      )}

      
    </View>
  );
};

export default Hatirlaticilar;
