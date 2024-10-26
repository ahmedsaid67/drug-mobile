import { StyleSheet,Dimensions } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
  },
  container: {
    flex: 1,
    paddingHorizontal: colors.mainPadingHorizantal,
    paddingVertical: colors.mainPadingVertical,
  },
  loadingConatiner:{
    flex:1,
    justifyContent:"center"
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: colors.mainPadingVertical,      // Reduced margin
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: height * 0.15,            // Smaller profile image
    height: height * 0.15,           // Smaller profile image
    borderRadius: height * 0.075,      // Adjusted for smaller image
    borderWidth: 1,        // Thinner border
    borderColor: colors.uygulamaRengi,
    backgroundColor: '#fff',
  },
  profileImagePlaceholder: {
    width: height * 0.15,            // Smaller placeholder
    height: height * 0.15,           // Smaller placeholder
    borderRadius: height * 0.075,      // Adjusted for smaller placeholder
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,        // Thinner border
    borderColor: colors.uygulamaRengi,
  },
  editIcon: {
    position: 'absolute',
    bottom: height * 0.007,
    right: height * 0.007,
    backgroundColor: colors.uygulamaRengi,
    borderRadius: height * 0.025,      // Slightly smaller icon button
    height: height * 0.05,           // Smaller padding
    width: height * 0.05,
    alignItems:'center',
    justifyContent:'center'           
  },
  input: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: colors.mainPadingHorizantal,   // Reduced padding for a slimmer input field
    marginTop: height * 0.0125,     // Reduced margin
    borderWidth: 1,     // Kenar çizgisi kalınlığı
    borderColor: colors.border,
    borderRadius: height * 0.006,
    fontSize: colors.fontSizeText,          // Smaller font size
    color: colors.text,
    height: colors.inputHeight ,
  },
  updateButton: {
    backgroundColor: colors.uygulamaRengi,
    height:colors.buttonHeight,
    borderRadius: height * 0.012,       // Slightly smaller corner radius
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.025,         // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,   // Softer shadow
    shadowRadius: 1.5,
    height:colors.buttonHeight,
  },
  updateButtonText: {
    color: colors.secondText,
    fontSize: colors.fontSizeText,          // Smaller font size
    fontWeight: 'bold',    // Slightly lighter font weight
  },
  logoutButton: {
    backgroundColor: colors.uygulamaIkinciRengi,
    borderRadius: height * 0.012,       // Slightly smaller corner radius
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.0125,       // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,   // Softer shadow
    shadowRadius: 1.5,
    height:colors.buttonHeight,
  },
  logoutButtonText: {
    color: colors.secondText,
    fontSize: colors.fontSizeText,          // Smaller font size
    fontWeight: 'bold',
  },
});

export default styles;
