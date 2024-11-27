import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
    padding: colors.mainPadingVertical,
    paddingBottom: 0,
  },
  searchBoxContainer: {
    color: colors.text,
  },
  searchBox: {
    height: colors.searchHeight,
    borderWidth: 1.50,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 15,
    color: colors.text,
  },
  popularSearchesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20, // Font boyutunu artırarak daha belirgin hale getirme
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popularSearchItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#6200ee', // Modern bir renk
  },
  searchResultsContainer: {
    flex: 1,
  },
  firstContainer: {
    width: "85%"
  },
  searchResultsContainer: {
    flex: 1,
  },
  medicineItem: {
    width: '100%',
    paddingVertical: colors.mainPadingHorizantal,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineName: {
    fontSize: colors.fontSizeText, // Font boyutunu artırarak daha okunabilir hale getirme
    color: colors.text,
    flex: 1,
  },
  medicineNameNew: {
    fontSize: colors.fontSizeText, // Font boyutunu artırarak daha okunabilir hale getirme
    color: colors.text,
    flex: 1,
  },
  activeIngredient: {
    fontSize: 14,
    color: colors.thirdText,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1, // Tüm alanı kapla
    backgroundColor: colors.MainContainerBackground,
    justifyContent: 'center', // Dikey ortalama
    alignItems: 'center', // Yatay ortalama
  },
  modalBackground: {
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
    minHeight: 200, // Modalın yüksekliği (ayarlanabilir)
    width: '100%', // Tüm genişliği kapsasın
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
    textAlign: 'center', // Başlığı ortala
  },
  button: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center', // Butonu ortala
  },
  buttonSecond: {
    backgroundColor: colors.uygulamaIkinciRengi,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center', // Butonu ortala
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default styles;
