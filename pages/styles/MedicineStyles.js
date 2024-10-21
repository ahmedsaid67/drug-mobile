import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background, // Daha temiz bir beyaz arka plan
  },
  inputRow: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 18, // Daha büyük metin
    color: '#333333', // Daha koyu bir metin rengi
    marginBottom: 5,
  },
  input: {
    height: 50, // Daha büyük giriş alanı
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8, // Daha yuvarlak köşeler
    paddingHorizontal: 10,
    fontSize: 18, // Daha büyük metin
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  backButton: {
    backgroundColor: '#9e9e9e', // Daha yumuşak bir gri ton
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  forwardButton: {
    backgroundColor: '#2196f3', // Daha canlı bir mavi ton
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff', // Beyaz metin
    fontSize: 18, // Daha büyük metin
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#f5f5f5', // Hafif gri arka plan
    borderRadius: 8,
    marginBottom: 15,
  },
  medText: {
    fontSize: 20, // Daha büyük metin
    fontWeight: 'bold',
    color: '#333333',
  },
  warningText: {
    fontSize: 18, // Daha büyük metin
    color: '#d32f2f', // Kırmızı uyarı metni
    marginTop: 10,
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#e8f5e9', // Hafif yeşil arka plan
    borderRadius: 8,
    marginBottom: 15,
  },
  resultText: {
    fontSize: 18, // Daha büyük metin
    color: '#388e3c', // Yeşil metin
  },
  instructionsButton: {
    backgroundColor: '#ff9800', // Turuncu buton
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    position: 'absolute',
    bottom: 80, // Butonlar arasında boşluk bırakmak için
    left: 20,
    right: 20,
  },
  instructionsButtonText: {
    color: '#ffffff',
    fontSize: 18, // Daha büyük metin
    textAlign: 'center',
  },
  checkText: {
    fontSize: 18, // Daha büyük metin
    color: '#f57c00', // Turuncu metin
  },
  // Diğer stiller...
});

export default styles;
