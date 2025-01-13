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
    // Add content filtering
    contentRating: ['G', 'PG'],
    // Yasaklı kategoriler
    restrictedCategories: keywords.restrictedCategories,
    // Ek kısıtlamalar
    tag: 'health_wellness',
    maxAdContentRating: 'G',
    // Belirli ağlar veya reklam türlerini engelle
    blockedNetworks: [
        'gambling_network_1', 'adult_network_1', 'app_download_network', 'alcohol_network'
    ],
    // Reklam türü kısıtlamaları
    preventAppDownloadAds: true,
    // Sıkı reklam inceleme ve onay
    adReviewRequired: true,
    // Otomatik filtreleme sistemi
    autoAdFiltering: true,
    // Dinamik/kullanıcı tarafından oluşturulan içerikleri engelle
    blockDynamicAds: true
  });

  useEffect(() => {
    let isInitialLoad = true;
    let timeoutId;

    const loadAd = async () => {
      try {
        await appOpenAd.load();
        console.log('Açılış reklamı yüklendi');
      } catch (error) {
        console.log('Reklam yükleme hatası:', error);
      }
    };

    // 60 saniyelik gecikme ile reklam yükleme
    timeoutId = setTimeout(() => {
      loadAd();
    }, 60000);

    const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, async () => {
      if (isInitialLoad) {
        try {
          const adInfo = await appOpenAd.show();
          
          const isAdAppropriate = () => {
            if (!adInfo || !adInfo.contentRating) {
              return false;
            }

            const isValidRating = ['G', 'PG'].includes(adInfo.contentRating);
            const isValidCategory = !['gambling', 'betting', 'casino'].some(
              category => adInfo.categories?.includes(category)
            );
            const isValidNetwork = !['gambling_network_1', 'adult_network_1', 'app_download_network'].some(
              network => adInfo.network === network
            );
            const isNotAppDownload = !(adInfo.type === 'app_download');

            return isValidRating && isValidCategory && isValidNetwork && isNotAppDownload;
          };

          if (!isAdAppropriate()) {
            console.log("Uygun olmayan reklam, gösterilmiyor");
            return;
          }
          
          console.log("Uygun reklam gösteriliyor");
          isInitialLoad = false;
        } catch (error) {
          console.log("Reklam gösteriminde hata:", error);
        }
      }
    });

    const unsubscribeError = appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Reklam hatası:', error);
    });

    return () => {
      clearTimeout(timeoutId);
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
