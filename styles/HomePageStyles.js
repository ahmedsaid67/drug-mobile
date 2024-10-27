import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
    padding: colors.mainPadingVertical,
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
    height: colors.searchHeight,
    borderWidth: 1.50,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 15,
    color: colors.text,
   
  },
  sectionTitle: {
    fontSize: colors.fontSizeTextMaxi,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    color: colors.text,
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
    borderWidth: 1.50,
    borderColor: colors.border,
    paddingTop: 10,  // Üstten boşluk eklendi
    marginBottom: 20,
  },
  image: {
    width: '90%',  // Resim genişliği kartın %90'ı
    height: '70%',  // Resim yüksekliği kartın %70'i, böylece metin için daha fazla alan kalır
    resizeMode: 'contain',  // Resim, kartın içinde orantılı bir şekilde yer alacak
  },
  cardText: {
    padding: 5,  // Metin için daha az padding
    fontSize: colors.fontSizeTextMini,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444',
    width: '90%',  // Metin alanının kart genişliğinin tamamını kaplamasını sağla
    maxHeight: width * 0.2,  // Yükseklik sınırı, ikinci satırın çıkmaması için
    overflow: 'hidden',  // Metin sığmazsa kesilmesini sağlar
    numberOfLines: 1,  // En fazla 2 satır olacak şekilde sınırla
    ellipsizeMode: 'tail',  // Metin sığmazsa "..." ile kısaltır
  },
  
  buttonContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'flex',
    paddingBottom: 40,
  },



  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '70%',
    backgroundColor: colors.uygulamaRengi,
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#6200ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 15,
  },
  reminderText: {
    color: '#fff',
    fontSize: colors.fontSizeText,
    marginRight: 8,
  },
  loadingContainer:{
    height: width * 0.38,
    justifyContent: 'center',
    alignItems: 'center',

  }
});

export default styles;
