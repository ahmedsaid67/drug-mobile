import { StyleSheet } from 'react-native';
import { colors } from './colors';
import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  bottomBar: {
    position: 'static', // Use absolute positioning for a floating effect
    backgroundColor: colors.MainContainerBackground,
    flexDirection: 'row',
    justifyContent: 'space-beetwen',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 5, // Add shadow effect for Android
    shadowColor: colors.border, // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
    paddingHorizontal: colors.mainPadingHorizantal,
    height:height * 0.09,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: colors.text,
    fontSize: height * 0.013, // Adjusted font size for better balance
    marginTop: 4,
    fontWeight: 'bold', // Make text bold for emphasis
  },
});

export default styles;
