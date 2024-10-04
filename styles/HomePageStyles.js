
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
    padding: 10,
  },
  navbar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    width: width * 0.33,  // Kart genişliği ekranın %38'i
    marginRight: 10,
    backgroundColor: '#f0f0f0', // Kartın arka plan rengi
    borderRadius: 10,
    justifyContent: 'flex-start', // Kart içindeki elemanlar yukarı hizalanacak
    alignItems: 'center',         // Elemanlar yatayda ortaya hizalanacak
    overflow: 'hidden',
  },
  // Kart listesinin içindeki resim
  image: {
    width: '100%',
    padding: 40,        // Kartın tüm genişliğini kaplayacak
    height: 80,          // Sabit resim yüksekliği
    resizeMode: 'cover',  // Resmin kartı tamamen kaplamasını sağla
  },
  // Kartın altındaki metin
  cardText: {
    padding: 10,          // Resmin altına boşluk
    fontSize: 16,         // Yazı boyutu
    fontWeight: 'bold',   // Yazı kalınlığı
    textAlign: 'center',  // Metni ortala
    color: '#333',        // Metin rengi, arka plana göre kontrastlı olsun
  },
  adContainer: {
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  adText: {
    fontSize: 18,
    color: '#333',
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: "60%",
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20,
  },
  reminderText: {
    color: '#fff',
    fontSize: 20,
    marginRight: 5,
  },
});

export default styles;
