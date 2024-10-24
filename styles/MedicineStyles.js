import { StyleSheet } from 'react-native';
import { colors } from './colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.MainContainerBackground, // Daha temiz bir beyaz arka plan
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
    backgroundColor: colors.uygulamaRengi, // Daha canlı bir mavi ton
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
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    fontWeight: 'bold',
    color: '#333333',
  },
  warningText: {
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    color: '#DB4437', // Kırmızı uyarı metni
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
    flex: 1,
    backgroundColor: "#F2B01D",
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 5,  
  },
  instructionsButtonText: {
    color: '#ffffff',
    fontSize: colors.fontSizeText, // Daha büyük metin
    textAlign: 'center',
  },
  remindersButton: {
    flex: 1,
    backgroundColor: colors.uygulamaRengi,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 5,  
  },
  remindersButtonText: {
    color: '#ffffff',
    fontSize: colors.fontSizeText, // Daha büyük metin
    textAlign: 'center',
  },
  checkInfo: {
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    color:colors.text, // Turuncu metin
    marginBottom: 10,
  },
  checkText: {
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    color: "#DB4437", // Turuncu metin
  },
  pickerContainer: {
    height: 200,
    width: 100,
    justifyContent: 'center',
  },
  selectedLayout: {
    backgroundColor: '#e0e0e0',
  },
  elementText: {
    fontSize: 15,
    color: '#333',
  },
  // Diğer stiller...
});

export default styles;
