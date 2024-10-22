import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../styles/colors';

const NoReminders = () => {

  return (
    <View style={styles.container}>
      <Icon name="bell-slash" size={80} color={colors.uygulamaRengi} style={styles.icon} />
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
