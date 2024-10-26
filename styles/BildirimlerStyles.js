import { StyleSheet } from 'react-native';
import { colors } from './colors'; // Adjust the import path as necessary
import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
  },
  container: {
    paddingHorizontal: colors.mainPadingHorizantal,
    paddingTop: colors.mainPadingVertical,
    flex:1,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: height * 0.02,
    borderRadius: height * 0.013,
    marginBottom: colors.mainPadingHorizantal,
    borderColor: colors.border,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationContent:{
    flexDirection: 'columun',
    flex: 1, 
  },
  description: {
    fontSize: colors.fontSizeText,
    color: colors.text,
    marginBottom: height * 0.005,
    fontWeight: 'bold',
  },
  date: {
    fontSize: colors.fontSizeTextMini,
    color: colors.thirdText,
  },
  iconContainer :{
    justifyContent:"flex-end",
  },
  loaderStyle: {
    alignItems: "center",
    justifyContent:"center",
  },
});

export default styles;
