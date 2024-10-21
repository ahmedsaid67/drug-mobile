import React, { useState, useEffect } from 'react';
import { View, Text,  TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/MedicineStyles';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

const NidSearchPage = ({ route }) => {
  const { item } = route.params; 
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation(); // 'navigate' yerine 'navigation'

  console.log(item);

  return (
    loading ? ( 
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.uygulamaRengi} />
      </View>
    ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.medText}>{item.name} id {item.id}</Text>
          
            {item.hastaliklar && item.hastaliklar.name && (
              <Text style={styles.ingredientText}>{item.hastaliklar.name} hastalığı için</Text>
            )}
            {item.etken_madde && (
              <Text style={styles.ingredientText}>{item.etken_madde}</Text>
            )}
            {item.ilac_kategori && item.ilac_kategori.name && (
              <Text style={styles.ingredientText}>{item.ilac_kategori.name}</Text>
            )}
      
        </View>

        <View style={styles.resultContainer}>
          {/* Sonuçları işleme */}
          {typeof result === 'string' ? (
            <Text style={styles.resultText}>{result}</Text>
          ) : (
            <>
              {item.message && (
                <Text style={styles.resultText}>Doz Miktarı: {item.message}</Text>
              )}
              {item.kullanim_sikligi && (
                <Text style={styles.resultText}>Kullanım Sıklığı: {item.kullanim_sikligi}</Text>
              )}
              {item.doz && (
                <Text style={styles.resultText}>{item.doz}</Text>
              )}
              {item.bilgi && (
                <Text style={styles.resultText}>{item.bilgi}</Text>
              )}
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.instructionsButton} 
          onPress={() => {
            if (item.document) {
              navigation.navigate('PdfViewer', { documentUrl: item.document });
            } else {
              console.log('Belge bulunamadı.');
            }
          }}
        >
          <Text style={styles.instructionsButtonText}>Kullanım Talimatları</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.remindersButton} 
          onPress={() => {
           
          }}
        >
          <Text style={styles.remindersButtonText}>Hatırlatıcı Oluştur</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </>
    )
  );
};

export default NidSearchPage;
