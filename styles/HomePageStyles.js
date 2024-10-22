import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
    padding: 15,
  },
  navbar: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  sectionTitle: {
    fontSize: colors.fontSizeTextMaxi,
    fontWeight: '600',
    marginVertical: 12,
    color: '#333',
  },
  card: {
    width: width * 0.38,  // Kart genişliği %38
    height: width * 0.38,  // Kart yüksekliği %38
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    paddingTop: 10,  // Üstten boşluk eklendi
  },
  image: {
    width: '90%',  // Resim genişliği kartın %90'ı
    height: '70%',  // Resim yüksekliği kartın %70'i, böylece metin için daha fazla alan kalır
    resizeMode: 'contain',  // Resim, kartın içinde orantılı bir şekilde yer alacak
  },
  cardText: {
    padding: 14,  // Metin için daha az padding
    fontSize: colors.fontSizeTextMini,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444',
    width: '100%',  // Metin alanının kart genişliğinin tamamını kaplamasını sağla
  },
  
  
  
  adContainer: {
    height: 140,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  adText: {
    fontSize: colors.fontSizeText,
    color: '#555',
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '70%',
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 30,
  },
  reminderText: {
    color: '#fff',
    fontSize: colors.fontSizeText,
    marginRight: 8,
  },
});

export default styles;
