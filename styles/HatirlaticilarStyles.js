import { StyleSheet } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary
import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.MainContainerBackground,
    },
    dateSection: {
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingVertical: colors.mainPadingVertical,
    },
    dateContainer: {
      width: height * 0.075,
      height: height * 0.1,
      borderRadius: height * 0.013,
      marginHorizontal: height * 0.0075,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedDate: {
      backgroundColor: colors.uygulamaRengi,
    },
    dateText: {
      fontSize: colors.fontSizeText,
      fontWeight: 'bold',
      color: colors.text,
    },
    dayText: {
      fontSize: colors.fontSizeTextMini,
      color: colors.thirdText,
    },
    selectedDateText: {
      color: colors.secondText,
    },
    todayLabel: {
      marginTop: height * 0.025,
      fontSize: colors.fontSizeText,
      fontWeight: 'bold',
      color: colors.uygulamaRengi,
    },
    reminderMainContainer:{
      paddingHorizontal: colors.mainPadingHorizantal,
      paddingTop: colors.mainPadingVertical,
      flex:1
    },
    reminderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: height * 0.02,
      marginBottom: colors.mainPadingHorizantal,
      borderRadius: height * 0.013,
      borderColor: colors.border,
      borderWidth: 1,
      position: 'relative', // Add this to position children absolutely within it
    },
    reminderContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1, // Allow this to take up remaining space
    },
    reminderTextContainer: {
      marginLeft: height * 0.02,
      flex: 1, // Allow this to take up remaining space
    },
    reminderText: {
      fontSize: colors.fontSizeText,
      fontWeight: 'bold',
      color: colors.text,
    },
    reminderDetails: {
      marginTop: height * 0.005,
      fontSize: colors.fontSizeTextMini,
      color: colors.thirdText,
    },
    iconContainer :{
      justifyContent:"center"
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Increased opacity for a darker overlay
  },
  modalContainer: {
      width: '85%',
      paddingHorizontal: colors.mainPadingHorizantal,
      paddingBottom:colors.mainPadingHorizantal,
      paddingTop:colors.mainPadingHorizantal * 2,
      backgroundColor: '#fff', // Changed to pure white for better contrast
      borderRadius: height * 0.024,
      alignItems: 'center',
  },
  closeButton: {
      position: 'absolute',
      top: colors.mainPadingHorizantal / 2,
      right: colors.mainPadingHorizantal / 2,
      zIndex:1,
  },
  textContainer: {
    marginBottom:colors.mainPadingVertical * 2,
  },
  modalTitle: {
      fontSize: colors.fontSizeTextMaxi, // Increased font size for better visibility
      fontWeight: 'bold',
      color: colors.text, // Dark grey for better contrast
      marginBottom:colors.mainPadingHorizantal / 2,
  },
  uyariText: {
      fontSize: colors.fontSizeText,
      color: colors.text, // Lighter grey for warning text
      textAlign: 'center',
      marginBottom:colors.mainPadingHorizantal * 2,
  },
  modalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },
  pauseButton: {
    backgroundColor: colors.uygulamaIkinciRengi,
    paddingVertical: height * 0.015,
    paddingHorizontal: colors.paddingHorizontal,
    borderRadius: height * 0.012,
    width: '45%',
  },
  deleteButton: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: height * 0.015,
    paddingHorizontal: colors.paddingHorizontal,
    borderRadius: height * 0.012,
    width: '45%',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Gri renk ile butonu devre dışı olduğunu belli ediyoruz
    shadowOpacity: 0, // Gölgeyi kaldırabiliriz
    elevation: 0, // Gölgeyi mobil cihazlar için de kapatalım
  },
  actionText: {
      color: '#FFFFFF',
      fontSize: colors.fontSizeText,
      fontWeight: 'bold',
      textAlign: 'center', // Center align text for better appearance
  },
  
    floatingButton: {
      position: 'absolute',
      bottom: colors.mainPadingHorizantal,
      right: colors.mainPadingHorizantal,
      backgroundColor: colors.uygulamaRengi,
      width: height * 0.07,
      height: height * 0.07,
      borderRadius: height * 0.035,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderStyle: {
      alignItems: "center",
      justifyContent:"center",
    },
  });
  

export default styles;