import React, { useState, useRef, useEffect } from 'react';
import UserProvider from '../context/provider';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';
import { useInterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../utils/addId';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const navigationRef = useRef();
  const yazilimmodu = false;

  const adUnitId =__DEV__ || Platform.OS === 'ios'  ? TestIds.INTERSTITIAL : AddIdIos.UYGULAMAACIKKEN|| Platform.OS === 'android' ? TestIds.INTERSTITIAL : AddIdAndroid.UYGULAMAACIKKEN;

  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
  });

  // Reklam yükle ve göster
  useEffect(() => {
    const loadAndShowAd = () => {
      load(); // Reklamı yükle
      if (isLoaded && !isClosed) { // Reklam yüklendi ve kapatılmadıysa
        console.log("Reklam yüklendi, gösteriliyor");
        if(!yazilimmodu){
          show(); // Reklamı göster
        }
        
      } else {
        console.log("Reklam yüklenmedi");
      }
    };

    // İlk reklamı göster
    loadAndShowAd();

    // 2 dakika (120,000 ms) aralıklarla reklam gösterme
    const intervalId = setInterval(loadAndShowAd, 120000);

    // Cleanup: interval temizlenmeli
    return () => clearInterval(intervalId);

  }, [load, isLoaded, isClosed, show]); // Gerekli bağımlılıklar

  return (
    <UserProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setCurrentRoute(navigationRef.current.getCurrentRoute().name);
        }}
        onStateChange={() => {
          const route = navigationRef.current.getCurrentRoute();
          if (route) {
            setCurrentRoute(route.name);
          }
        }}
      >
        <Router currentRoute={currentRoute} />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
