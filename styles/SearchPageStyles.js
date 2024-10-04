import { StyleSheet } from 'react-native';
import { colors } from './colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
  },
  searchBoxContainer: {
    color: "black",
    padding: 16,
  },
  searchBox: {
    color: "black",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  popularSearchesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popularSearchItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  adContainer: {
    height: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    alignSelf: 'center', // Orta hizalamak için
    marginVertical: 20,
  },
  adText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center', // Metni ortalamak için
  },
  searchResultsContainer: {
    flex: 1,
  },
  divider: {
    width: '100%',  // Çizginin genişliği %80 olsun
    height: 2,     // Çizginin kalınlığı
    backgroundColor: '#ccc',
    alignSelf: 'center', // Çizgiyi ortalar
    marginTop: 8, // İlaç adından sonra biraz boşluk
  },
  medicineItem: {
    width: '100%',  // Tüm container genişliğini %100 yap
    padding: 16,
  },
  medicineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  medicineName: {
    fontSize: 16,
    color: "black",
    flex: 1,
  },
  activeIngredient: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bottomLine: {
    width: '80%',  // Çizginin genişliğini %80 yap
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 8,
  },
});

export default styles;
