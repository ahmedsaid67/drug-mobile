import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { API_ROUTES } from '../../utils/constant';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation(); 
  const handleAccept = () => {
   
    navigation.navigate('İlaç Bilgisi',  { item: item  })

   
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
          <Ionicons name="warning"  style={styles.icons}/>
          <Text style={styles.checkInfo}>Kullanım uyarısı</Text>
          
          {item.check_uyari ? (
              <Text style={styles.checkText}>{item.check_uyari}{item.check_uyari.slice(-1) !== '.' ? '.' : ''}</Text>
            ) : null}
          
          
         
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
