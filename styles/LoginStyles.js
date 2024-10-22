import { StyleSheet } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const styles = StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: colors.MainContainerBackground,
    },
    container: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: colors.fontSizeTextMaxi,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text,
      textAlign: 'left',  // Sol hizalı başlık
    },
    input: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 10,
      borderRadius: 4,
      textAlign: 'left',  // Sol hizalı input
      borderWidth: 1,     // Kenar çizgisi kalınlığı
      borderColor: colors.border,
      color: colors.text,
      fontSize: colors.fontSizeText,
      height: colors.inputHeight ,
    },
    button: {
      backgroundColor: colors.uygulamaRengi,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
      height:colors.buttonHeight,
    },
    buttonText: {
      color: colors.secondText,
      fontWeight: 'bold',
      fontSize: colors.fontSizeText,
    },
    forgotPasswordText: {
      color: colors.uygulamaRengi,
      marginTop: 10,
      textAlign: 'left',  // Sol hizalı
      fontSize: colors.fontSizeText,
    },
    registerContainer: {
      flexDirection: 'row',
      marginTop: 16,
      justifyContent: 'flex-start',  // Sol hizalı kayıt ol bölümü
    },
    registerText: {
      color: 'black',
      marginRight: 5,
      fontSize: colors.fontSizeText,
    },
    registerLink: {
      color: colors.uygulamaRengi,
      fontSize: colors.fontSizeText,
    },
    inputError: {
      borderColor: colors.uygulamaRengi,
      borderWidth: 1,
    },
    errorText: {
      color: colors.uygulamaRengi,
      fontSize: colors.fontSizeTextMini,
      marginBottom: 8,
    },
    loadingIndicator: {
      padding: 15,
      alignItems: 'center',
    },
    passwordContainer: {
      position: 'relative',
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
      top: 15,
      zIndex: 1,
    },
    eyeIconImage: {
      width: 24,
      height: 24,
    },
    googleButton: {
      backgroundColor: '#4285F4',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
      height:colors.buttonHeight,
    },
    
    
});

export default styles;
