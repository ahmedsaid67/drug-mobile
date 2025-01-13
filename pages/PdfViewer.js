import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import { colors } from '../styles/colors';
import styles from '../styles/PdfreaderStyles';
import { useInterstitialAd, TestIds, AdEventType, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'

import { Platform } from 'react-native';
import { AddIdAndroid, AddIdIos, keywords } from '../utils/addId';

const PdfViewer = ({ route }) => {
  const { documentUrl } = route.params; // URL ile PDF gösteriliyor
  const [pdfPath, setPdfPath] = useState('');
  const [loading, setLoading] = useState(true);

  const bannerId = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERPDF1 : AddIdAndroid.BANNERPDF1;


  const bannerId2 = __DEV__ ? TestIds.BANNER : Platform.OS === 'ios' ? AddIdIos.BANNERPDF2 : AddIdAndroid.BANNERPDF2;

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        const path = `${RNFetchBlob.fs.dirs.DocumentDir}/document.pdf`;
        await RNFetchBlob.config({
          path: path,
          fileCache: true,
        }).fetch('GET', documentUrl);
        setPdfPath(path);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    downloadPdf(); 
  }, [documentUrl]);

 

  return (
    loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <View style={styles.container}>
      <View style={styles.adContainer}>
        <BannerAd
            unitId={bannerId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
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
            }}
        />
      </View>
      <Pdf
        source={{ uri: pdfPath, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
        enablePaging={true} // Sayfa geçişini etkinleştir
        horizontal={false} // Sayfaları yan yana göster
        enableAnnotation={false} // Not eklemeyi devre dışı bırak
        enableDownload={false} // İndirme işlemini devre dışı bırak
      />

    <View style={styles.adContainer}>
            <BannerAd
                unitId={bannerId2}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
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
                }}
            />
          </View>
    </View>
    )
  );
};

export default PdfViewer;
 