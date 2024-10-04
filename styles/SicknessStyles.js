import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',  // Hafif bir arka plan rengi
    padding: 20,
  },
  title: {
    fontSize: 24,
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
    fontSize: 18,
    color: "black",
    textAlign: 'left',  // Sol hizalı metin
  },
});

export default styles;
