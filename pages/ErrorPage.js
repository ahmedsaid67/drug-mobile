import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icon library

const ErrorPage = ({ route }) => {
  const { errorMessage } = route.params;
  const navigation = useNavigation();

  const handleRetry = () => {
    const state = navigation.getState();
    const previousRoute = state.routes[state.index - 1];
    const previousPageName = previousRoute?.name;

    if (previousPageName) {
      navigation.replace(previousPageName);
    } else {
      console.log("Previous page not found.");
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="exclamation-triangle" size={80} color={colors.uygulamaRengi} />
      <Text style={styles.title}>Bir Hata Oluştu!</Text>
      <Text style={styles.errorText}>{errorMessage}</Text>

      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Tekrar Dene</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.MainContainerBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    color: colors.uygulamaRengi,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  errorText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  retryButtonText: {
    color: colors.secondText,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ErrorPage;
