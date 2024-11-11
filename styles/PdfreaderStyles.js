import { StyleSheet,Dimensions } from 'react-native';
import { colors } from './colors';

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background, // Arka plan rengi
      },
      container: {
        flex: 1,
        backgroundColor: colors.MainContainerBackground, // Beyaz arka plan
      },
      adContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
      },

});

export default styles;
