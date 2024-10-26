import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons import edildi
import { colors } from '../styles/colors';
const { height } = Dimensions.get('window');

const NoReminders = () => {
  return (
    <View style={styles.container}>
      <Icon name="alarm" size={height * 0.13} color={colors.uygulamaRengi} style={styles.icon} />
      <Text style={styles.text}>Hatırlatıcı bulunmuyor.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: colors.fontSizeTextMaxi,
    color: colors.uygulamaRengi,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NoReminders;

