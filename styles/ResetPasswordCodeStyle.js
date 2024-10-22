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
      errorText: {
        color: colors.uygulamaRengi,
        fontSize: colors.fontSizeTextMini,
        marginBottom: 8,
      },
      inputError: {
        borderColor: colors.uygulamaRengi,
        borderWidth: 1,
      },
      loadingIndicator: {
        marginVertical: 20,
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

});

export default styles;