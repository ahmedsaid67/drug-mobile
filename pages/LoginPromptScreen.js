import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../styles/colors";

const { height, width } = Dimensions.get('window');

const LoginPromptScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="person-outline" size={height * 0.15} color={colors.uygulamaRengi} />
        <Text style={styles.promptText}>
          Ölçek hesabım
        </Text>
        <Text style={styles.promptTextSecond}>
          Kayıt ol ve Ölçek’te hatırlatıcı oluşturmaya başla.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Kayıt')}
          activeOpacity={0.7} // Feedback for touch
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        {/* Giriş Yap Text */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Giriş')}
          style={styles.loginTextContainer}
          activeOpacity={0.7} // Feedback for touch
        >
          <Text style={styles.loginText}>
            Hesabın var mı? <Text style={styles.loginActionText}>Giriş yap</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center contents horizontally
    justifyContent: 'space-around', // Distribute space evenly vertically
    paddingHorizontal: colors.mainPadingHorizantal,
    paddingVertical: colors.mainPadingHorizantal, // Add more vertical padding
    backgroundColor: colors.MainContainerBackground 
  },
  iconContainer: {
    alignItems: 'center', // Center the icon and text
  },
  promptText: {
    fontSize: colors.fontSizeText, // Responsive font size
    color: colors.text,
    marginBottom: colors.mainPadingHorizantal / 2, // Space between icon and button
    marginTop: colors.mainPadingHorizantal,
    fontWeight:"bold"
  },
  promptTextSecond: {
    fontSize: colors.fontSizeTextMini, // Responsive font size
    color: colors.text,
    paddingHorizontal: colors.mainPadingHorizantal,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%', // Make container full width for button
    alignItems: 'center', // Center buttons horizontally
    justifyContent: 'center', // Center content within the button container
  },
  button: {
    backgroundColor: colors.uygulamaRengi,
    width: '100%', // Adjust width for better alignment
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: height * 0.012,
    height: colors.buttonHeight,
    marginVertical: height * 0.0125, // Vertical spacing for buttons
  },
  buttonText: {
    color: colors.secondText,
    fontSize: height * 0.022, // Responsive font size
    fontWeight: 'bold',
  },
  loginTextContainer: {
    marginTop: height * 0.02,
  },
  loginText: {
    color: colors.text,
    fontSize: height * 0.018, // Responsive font size
  },
  loginActionText: {
    color: colors.uygulamaRengi,
    fontWeight: 'bold', // Make it stand out
  },
});

export default LoginPromptScreen;




