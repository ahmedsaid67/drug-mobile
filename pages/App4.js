import React, { useState, useRef, useEffect } from 'react';
import UserProvider from '../context/provider';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';
import { AppOpenAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../utils/addId';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('');
  const navigationRef = useRef();

  const adUnitId =  __DEV__ ? TestIds.APP_OPEN : Platform.OS === 'ios' ? AddIdIos.UYGULAMAACIKKEN : AddIdAndroid.UYGULAMAACIKKEN;

  // const adUnitId =  __DEV__ ? TestIds.APP_OPEN : Platform.OS === 'ios' ? AddIdIos.UYGULAMAACIKKEN : AddIdAndroid.UYGULAMAACIKKEN;

  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: keywords.healthcare,
  });

  useEffect(() => {
    let isInitialLoad = true;

    const loadAd = async () => {
      try {
        await appOpenAd.load();
        console.log('Açılış reklamı yüklendi');
      } catch (error) {
        console.log('Reklam yükleme hatası:', error);
      }
    };

    // İlk yüklemeyi yap
    loadAd();

    const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      // Sadece ilk yüklemede reklamı göster
      if (isInitialLoad) {
        appOpenAd.show();
        isInitialLoad = false;
      }
    });

    const unsubscribeError = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Reklam hatası:', error);
    });

    return () => {
      unsubscribeLoaded();
      unsubscribeError();
    };
  }, []);

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
