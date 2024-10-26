import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';
import { colors } from '../styles/colors';
import styles from '../styles/MedicineStyles';

const PdfViewer = ({ route }) => {
  const { documentUrl } = route.params; // URL ile PDF gösteriliyor
  const [pdfPath, setPdfPath] = useState('');
  const [loading, setLoading] = useState(true);

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
    <View style={{ flex: 1 }}>
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
        style={{ flex: 1, width: Dimensions.get('window').width }}
        enablePaging={true} // Sayfa geçişini etkinleştir
        horizontal={true} // Sayfaları yan yana göster
        enableAnnotation={false} // Not eklemeyi devre dışı bırak
        enableDownload={false} // İndirme işlemini devre dışı bırak
      />
    </View>
    )
  );
};

export default PdfViewer;
 