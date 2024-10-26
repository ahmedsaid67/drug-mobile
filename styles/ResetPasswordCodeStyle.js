import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: colors.MainContainerBackground,
      },
    container: {
      paddingHorizontal: colors.mainPadingHorizantal,
      paddingVertical: colors.mainPadingVertical,
    },
    title: {
      fontSize: colors.fontSizeTextMaxi,
      fontWeight: 'bold',
      marginBottom: colors.mainPadingHorizantal,
      color: colors.text,
      textAlign: 'left',  // Sol hizalı başlık
    },
    input: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: colors.mainPadingHorizantal,
      marginBottom: height * 0.0125,
      borderRadius: height * 0.006,
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
      borderRadius: height * 0.012,
      marginTop: height * 0.0125,
      height:colors.buttonHeight,
    },
    buttonText: {
      color: colors.secondText,
      fontWeight: 'bold',
      fontSize: colors.fontSizeText,
    },
    errorText: {
      color: colors.uygulamaRengi,
      fontSize: colors.fontSizeTextMini,
      marginBottom: height * 0.0125,
    },
    inputError: {
      borderColor: colors.uygulamaRengi,
      borderWidth: 1,
    },

    passwordContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: height * 0.006,
      marginBottom: height * 0.0125,
      paddingHorizontal: colors.mainPadingHorizantal,
    },
    passwordInput: {
      flex: 1,  // Giriş alanı esnek olacak, boşluğu dolduracak
      color: colors.text,
      fontSize: colors.fontSizeText,
      height: colors.inputHeight,
      padding:0
    },
    eyeIcon: {
      marginLeft: height * 0.0125,  // Göz ikonunu input'tan biraz ayırıyoruz
    },

});

export default styles;