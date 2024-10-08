import { StyleSheet } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20, // Reduced padding for a more compact look
    paddingVertical: 16,   // Reduced padding for a more compact look
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,      // Reduced margin
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,            // Smaller profile image
    height: 100,           // Smaller profile image
    borderRadius: 50,      // Adjusted for smaller image
    borderWidth: 1,        // Thinner border
    borderColor: colors.uygulamaRengi,
    backgroundColor: '#fff',
  },
  profileImagePlaceholder: {
    width: 100,            // Smaller placeholder
    height: 100,           // Smaller placeholder
    borderRadius: 50,      // Adjusted for smaller placeholder
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,        // Thinner border
    borderColor: colors.uygulamaRengi,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.uygulamaRengi,
    borderRadius: 12,      // Slightly smaller icon button
    padding: 4,           // Smaller padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,   // Softer shadow
    shadowRadius: 1.5,
  },
  input: {
    width: '100%',
    paddingVertical: 8,   // Reduced padding for a slimmer input field
    marginVertical: 6,     // Reduced margin
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 14,          // Smaller font size
    color: colors.text,
  },
  emailInput: {
    width: '100%',
    paddingVertical: 8,   // Reduced padding for a slimmer input field
    marginVertical: 6,     // Reduced margin
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f2f2f2', // Grey background for uneditable field
    fontSize: 14,          // Smaller font size
    color: colors.text,
  },
  updateButton: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: 10,   // Reduced padding for a smaller button
    borderRadius: 6,       // Slightly smaller corner radius
    alignItems: 'center',
    marginTop: 12,         // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,   // Softer shadow
    shadowRadius: 1.5,
  },
  updateButtonText: {
    color: colors.secondText,
    fontSize: 14,          // Smaller font size
    fontWeight: '500',    // Slightly lighter font weight
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 10,   // Reduced padding for a smaller button
    borderRadius: 6,       // Slightly smaller corner radius
    alignItems: 'center',
    marginTop: 12,         // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,   // Softer shadow
    shadowRadius: 1.5,
  },
  logoutButtonText: {
    color: colors.secondText,
    fontSize: 14,          // Smaller font size
    fontWeight: '500',    // Slightly lighter font weight
  },
  removeIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
