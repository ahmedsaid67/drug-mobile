import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';
import { he } from 'date-fns/locale';

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
  bottomBar: {
    position: 'static', // Use absolute positioning for a floating effect
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: colors.MainContainerBackground,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 5, // Add shadow effect for Android
    shadowColor: colors.border, // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10, // More padding for touchable area
  },
  label: {
    color: colors.text,
    fontSize: height * 0.013, // Adjusted font size for better balance
    marginTop: 4,
    fontWeight: 'bold', // Make text bold for emphasis
  },
});

export default styles;
