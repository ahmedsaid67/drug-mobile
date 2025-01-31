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
  buttonContainer2: {
    flexDirection: 'column',
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
  calculateButton: {
    backgroundColor: colors.uygulamaRengi, // Daha canlı bir mavi ton
    height: colors.buttonHeight,
    width: '35%', // Buton genişliği yüzde olarak ayarlanıyor
    borderRadius: 8,
    justifyContent: "center",
  },
  calculateButtonDisabled: {
    backgroundColor: colors.uygulamaRengiDisabled, // Daha canlı bir mavi ton
    height: colors.buttonHeight,
    width: '35%', // Buton genişliği yüzde olarak ayarlanıyor
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: '#ffffff', // Beyaz metin
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    textAlign: 'center',
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.MainContainerBackground,
    alignItems: 'center',
  },
  infoContainer: {
    marginBottom: 15,
    marginTop: 15,
  },
  medText: {
    fontSize: colors.fontSizeTextMaxi, // Daha büyük metin
    fontWeight: 'bold',
    color: colors.text,
  },
  warningText: {
    fontSize: colors.fontSizeText, // Daha büyük metin
    color: colors.text, // Kırmızı uyarı metni
    marginTop: 10,
  },
  resultContainer: {
    padding: 15,
    backgroundColor: '#e8f5e9', // Hafif yeşil arka plan
    color: colors.text,
    borderRadius: 8,
    marginBottom: 15,
    maxHeight: '70%', // Adjust the height as needed
  },
  scrollView: {
    flexGrow: 0,
  },
  adContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  adText: {
    fontSize: colors.fontSizeText,
    color: '#555',
  },

  resultText: {
    fontSize: colors.fontSizeText, // Daha büyük metin
    color: colors.text, // Kırmızı uyarı metni
  },
  instructionsButton: {
    flex: 1,
    backgroundColor: colors.uygulamaRengi,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,  
    justifyContent: "center",
  },
  homeButton: {
    flex: 1,
    backgroundColor: colors.uygulamaIkinciRengi,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,  
    justifyContent: "center",
  },
  instructionsButtonText: {
    color: '#ffffff',
    fontSize: colors.fontSizeText, // Daha büyük metin
    textAlign: 'center',
  },
  remindersButton: {
    flex: 1,
    backgroundColor: colors.uygulamaGoogleRengi,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,  
    justifyContent: "center",
  },
  remindersButtonDisable: {
    flex: 1,
    backgroundColor: colors.uygulamaGoogleRengiDisabled,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,  
    justifyContent: "center", 
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
    textAlign: "center",
  },
  checkText: {
    fontSize: colors.fontSizeText, // Daha büyük metin
    color: colors.text, // Kırmızı uyarı metni
    marginTop: 10,
    textAlign: "center",
  },
  checkTextSecond: {
    fontSize: colors.fontSizeText, // Daha büyük metin
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
    fontSize: 18,
    color: colors.thirdText,
    marginRight: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Modal ekranın altından gelsin
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arkayı hafif karartmak için
  },
  modalBackgroundSecond: {
    flex: 1,
    justifyContent: 'flex-end', // Modal ekranın altından gelsin
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arkayı hafif karartmak için
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20, // Köşeleri yuvarlatmak için
    borderTopRightRadius: 20,
    padding: 20,
    paddingVertical: 35,
    minHeight: "auto", // Modalın yüksekliği (ayarlanabilir)
    width: '100%', // Tüm genişliği kapsasın
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center', // Başlığı ortala
  },
  buttonModal: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'flex-start', // Butonu ortala
  },
  buttonTextModal: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Diğer stiller...
});

export default styles;
