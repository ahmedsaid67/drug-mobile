import { StyleSheet } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: colors.MainContainerBackground, // Use color from constants
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomColor: colors.border, // Use color from constants
    borderBottomWidth: 1, // Subtle top border
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  logoImage: {
    width: 100,  // Adjust the width based on your logo's aspect ratio
    height: 40,  // Adjust the height as needed for the logo
    resizeMode: 'contain', // Ensure the logo fits within the given size
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestText: {
    color: colors.text, // Use color from constants
    fontSize: 12,
    marginRight: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default styles;


