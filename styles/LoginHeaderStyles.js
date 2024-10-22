import { StyleSheet,Dimensions } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {

            width: '100%',
            backgroundColor: colors.MainContainerBackground, // Use color from constants
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: colors.border, // Use color from constants
            borderBottomWidth: 1, // Subtle top border
            paddingHorizontal: 20,
            paddingVertical:12,

      },
      logoText: {
        fontSize: height * 0.023,
        fontWeight: 'bold',
        color: colors.text,
        letterSpacing: 2,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
      },
});

export default styles;