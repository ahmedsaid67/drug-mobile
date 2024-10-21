import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../../styles/colors';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation(); // 'navigate' yerine 'navigation'

  console.log(item);
  
  const handleAccept = () => {
   
    navigation.navigate('MedicineDetail',  { item: item  })

   
  };


  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.infoContainer}>
          <Text style={styles.checkInfo}>ÖNEMLİ UYARI</Text>
          <Text style={styles.checkText}>{item.check_uyari} </Text>
          
         
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.buttonText}>Geri</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAccept} style={styles.forwardButton}>
            <Text style={styles.buttonText}>İleri</Text>
          </TouchableOpacity>
        </View>
      
        
      </ScrollView>
    </>
    )
  );
};

export default NidSearchPage;
