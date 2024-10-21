import { StyleSheet } from 'react-native';
import { colors } from './colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,  // Hafif bir arka plan rengi
    padding: 20,
  },
  title: {
    fontSize: colors.fontSizeTextMaxi,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',  // Ortalanmış başlık
  },
  noDiseaseTextContainer: {
    backgroundColor: '#ffeded', // Kırmızımsı uyarı arka planı
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000', // Hafif gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,  // Android için gölge
  },
  noDiseaseText: {
    color: '#d9534f', // Dikkat çeken bir kırmızı ton
    fontSize: 16,
    textAlign: 'center',
  },
  hastalikItem: {
    backgroundColor: '#ffffff',  // Beyaz kart arka planı
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
   
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,  // Kartlara hafif bir gölge
    
  },
  hastalikText: {
    fontSize: colors.fontSizeTextLarge,
    color: "black",
    textAlign: 'left',  // Sol hizalı metin
  },
  loadingContainer: {
    flex: 1, // Tüm alanı kapla
    justifyContent: 'center', // Dikey ortalama
    alignItems: 'center', // Yatay ortalama
  },
});

export default styles;
