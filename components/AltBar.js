import React, { useEffect, useState } from 'react'; // useEffect ve useState ekleniyor
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import styles from '../styles/AltBarStyles';
import { colors } from '../styles/colors'; // Adjust the import path as necessary

const AltBar = () => {
  const navigate = useNavigation();
  const [fps, setFps] = useState(0); // FPS durumu için state

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const updateFps = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastFrameTime >= 1000) { // 1 saniyede bir FPS hesapla
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = currentTime;
      }

      requestAnimationFrame(updateFps); // Bir sonraki frame için güncelle
    };

    requestAnimationFrame(updateFps); // FPS güncellemeye başla

    return () => cancelAnimationFrame(updateFps); // Temizleme işlemi
  }, []);

  const navigateToScreen = (screenName, params = {}) => {
    navigate.navigate(screenName, params);
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        onPress={() => navigateToScreen('Ana Sayfa')}
        style={styles.button}
      >
        <Icon name="home" size={24} color={colors.icon} />
        <Text style={styles.label}>Ana Sayfa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen('Arama')}
        style={styles.button}
      >
        <Icon name="search" size={24} color={colors.icon} />
        <Text style={styles.label}>Arama</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen('Bildirimler')}
        style={styles.button}
      >
        <Icon name="bell" size={24} color={colors.icon} />
        <Text style={styles.label}>Bildirimler</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen('Hatırlatıcılar')}
        style={styles.button}
      >
        <Icon name="clock-o" size={24} color={colors.icon} />
        <Text style={styles.label}>Hatırlatıcılar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateToScreen('Ana Sayfa')}
        style={styles.button}
      >
        <Text style={styles.label}>{fps}</Text>
      </TouchableOpacity>
      {/* FPS Sayacı */}
    </View>
  );
};

export default AltBar;



