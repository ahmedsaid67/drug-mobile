import { StyleSheet,Dimensions } from 'react-native';
import { colors } from './colors';

const { height } = Dimensions.get('window');


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
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    color: colors.text, // Daha koyu bir metin rengi
    fontWeight: "500",
    marginBottom: 20,
  },
  inputTouchable: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: colors.mainPadingHorizantal,
    marginBottom: height * 0.0125,
    borderRadius: height * 0.006,
    textAlign: 'left',  // Sol hizalı input
    borderWidth: 1,     // Kenar çizgisi kalınlığı
    borderColor: colors.border,
    color: colors.text,
    fontSize: colors.fontSizeText,
    height: colors.inputHeight ,

  },
  input: {
    flex: 1,  // TextInput'un esnekliği, tüm alanı kaplar
    color: colors.text,
    fontSize: colors.fontSizeText,
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
    height: colors.buttonHeight,
    width: '25%', // Buton genişliği yüzde olarak ayarlanıyor
    borderRadius: 8,
    justifyContent: "center",
  },
  forwardButton: {
    backgroundColor: colors.uygulamaRengi, // Daha canlı bir mavi ton
    height: colors.buttonHeight,
    width: '25%', // Buton genişliği yüzde olarak ayarlanıyor
    borderRadius: 8,
    justifyContent: "center",
  },
  forwardButtonDisabled: {
    backgroundColor: colors.uygulamaRengiDisabled, // Daha canlı bir mavi ton
    height: colors.buttonHeight,
    width: '25%', // Buton genişliği yüzde olarak ayarlanıyor
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: '#ffffff', // Beyaz metin
    fontSize: colors.fontSizeTextLarge, // Daha büyük metin
    textAlign: 'center',
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.MainContainerBackground,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  medText: {
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    fontWeight: 'bold',
    color: colors.text,
  },
  warningText: {
    fontSize: colors.fontSizeTextLarge, // Daha büyük metin
    color: colors.text, // Kırmızı uyarı metni
    marginTop: 10,
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#e8f5e9', // Hafif yeşil arka plan
    color: colors.text,
    borderRadius: 8,
    marginBottom: 15,
  },
  resultText: {
    fontSize: colors.fontSizeTextLarge, // Daha büyük metin
    color: colors.text, // Kırmızı uyarı metni
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
  remindersButtonDisable: {
    flex: 1,
    backgroundColor: colors.uygulamaRengiDisabled,
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
    fontWeight: "900",
    marginTop: 25,
    textAlign: "center",
  },
  checkText: {
    fontSize: colors.fontSizeTextLarge, // Daha büyük metin
    marginTop: 15,
    padding: 5,
    textAlign: "center",
    color: colors.text, // Turuncu metin
  },
  checkTextSecond: {
    fontSize: colors.fontSizeTextLarge, // Daha büyük metin
    marginTop: 15,
    padding: 5,
    color: colors.text, // Turuncu metin
  },
  icons:{
    fontSize: 340,
    color: colors.uygulamaRengi,
    textAlign: "center",
  },
  iconSmall:{
    fontSize: 35,
    color: colors.uygulamaRengi,
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
