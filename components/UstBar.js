import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import styles from '../styles/UstBarStyles';
import { colors } from '../styles/colors'; // Adjust the import path as necessary
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

const UstBar = ({ showBars, currentRoute }) => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation(); // Initialize navigation

  const handleIconPress = () => {
    if (user.id) {
      navigation.navigate('Profil'); // Navigate to Profile if user is logged in
    } else {
      navigation.navigate('Giriş'); // Navigate to Login if user is not logged in
    }
  };

  // Hide the bar for AppSplashScreen and ErrorPage
  if (currentRoute === 'AppSplashScreen' || currentRoute === 'ErrorPage') {
    return null; // Return nothing when the route matches
  }

  // Determine what text to display based on currentRoute
  const displayText = ['Giriş', 'Register', 'ResetPasswordCode', 'ResetPassword'].includes(currentRoute)
  ? 'Ölçek'
  : currentRoute;

  const navigatorHandle =()=>{
    if (currentRoute === 'Giriş') {
      const previousRoute = navigation.getState()?.routes[navigation.getState().index - 1]?.name;
      const twoStepsBackRoute = navigation.getState()?.routes[navigation.getState().index - 2]?.name;

      // Eğer bir önceki sayfa Ana Sayfa veya Arama ise
      if (previousRoute === 'Ana Sayfa' || previousRoute === 'Arama') {
          navigation.goBack(); // Bir önceki sayfaya yönlendir
      } 
      // Eğer Bildirimler veya Hatırlatıcılar ise iki önceki sayfaya yönlendir
      else if (previousRoute === 'Bildirimler' || previousRoute === 'Hatırlatıcılar' || previousRoute === 'Hatırlatıcı Oluştur') {
          navigation.navigate(twoStepsBackRoute);
      } else {
          navigation.navigate('Ana Sayfa'); // Eğer giriş sayfasındaysan Ana Sayfa'ya git
      }
    } else {
        navigation.goBack(); // Diğer durumlar için geri git
    }
  }

  return (
    <>
      {showBars ? (
        <View style={styles.container}>
          <Text style={styles.logoText}>Ölçek</Text> 
          <View style={styles.rightSection}>
            <TouchableOpacity onPress={handleIconPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconWrapper}>
                <Icon
                  name={user.id ? "person" : "person-outline"}
                  size={colors.iconHeight}
                  color={user.id ? colors.uygulamaRengi : colors.icon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={navigatorHandle}>
            <Icon name="arrow-back" size={colors.iconHeight} color={colors.icon} />
          </TouchableOpacity>
          <Text style={styles.logoText}>{displayText}</Text> 
        </View>
      )}
    </>
  );
};

export default UstBar;


