import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import styles from '../styles/AltBarStyles';
import { colors } from '../styles/colors'; 
import { useSelector } from 'react-redux';

const AltBar = ({ currentRoute }) => {
  const navigate = useNavigation();
  const user = useSelector((state) => state.user);

  const navigateToScreen = (screenName, params = {}) => {
    
    if (screenName==="Hatırlatıcılar"){
      if (user.id) {
        navigate.navigate(screenName, params);
      } else {
        navigate.navigate('Üyelik'); // Navigate to Login if user is not logged in
      }
    }else if ("Bildirimler") {
      if (user.id) {
        navigate.navigate(screenName, params);
      } else {
        navigate.navigate('Üyelik'); // Navigate to Login if user is not logged in
      }
    }else{
      navigate.navigate(screenName, params);
    }
  };

  const getIconColor = (screenName) => {
    return currentRoute === screenName ? colors.uygulamaRengi : colors.icon;
  };

  const getTextColor = (screenName) => {
    return currentRoute === screenName ? colors.uygulamaRengi : colors.icon; 
  };

  return (
    <View style={styles.bottomBar}>
      {['Ana Sayfa', 'Arama', 'Bildirimler', 'Hatırlatıcılar'].map((screen) => (
        <TouchableOpacity
          key={screen}
          onPress={() => navigateToScreen(screen)}
          style={styles.button}
        >
          <Icon 
            name={screen === 'Ana Sayfa' ? (currentRoute === 'Ana Sayfa' ? "home" : "home-outline") :  // Filled home icon if active
                  screen === 'Arama' ? (currentRoute === 'Arama' ? "search" : "search-outline") :  // Filled search icon if active
                  screen === 'Bildirimler' ? (currentRoute === 'Bildirimler' ? "notifications" : "notifications-outline") :  // Filled notifications icon if active
                  (currentRoute === 'Hatırlatıcılar' ? "alarm" : "alarm-outline")}  // Filled alarm icon if active
            size={colors.iconHeight} 
            color={getIconColor(screen)} 
          />
          <Text style={[styles.label, { color: getTextColor(screen) }]}>
            {screen}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AltBar;

