import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
  },
  searchBoxContainer: {
    padding: 16,
  },
  searchBox: {
    height: 45,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,  // Android shadow
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
  medicineItem: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Daha açık bir çizgi rengi
  },
  medicineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineName: {
    fontSize: 18, // Font boyutunu artırarak daha okunabilir hale getirme
    color: "black",
    flex: 1,
  },
  activeIngredient: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1, // Tüm alanı kapla
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
    minHeight: 200, // Modalın yüksekliği (ayarlanabilir)
    width: '100%', // Tüm genişliği kapsasın
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Başlığı ortala
  },
  button: {
    backgroundColor: '#007BFF',
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
