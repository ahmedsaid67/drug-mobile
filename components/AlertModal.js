import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { colors } from '../styles/colors';

const { height, width } = Dimensions.get('window');

const AlertModal = ({ isVisible, title, message, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide" // Slide-in animation for a more engaging experience
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Tamam</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Softer background opacity for a modern feel
  },
  modalContent: {
    backgroundColor: 'white',
    padding: colors.mainPadingHorizantal,
    borderRadius: height * 0.024, // More pronounced rounded corners
    width: width * 0.85,
    alignItems: 'center',
  },
  textContainer: {
    marginBottom:colors.mainPadingVertical * 2,
  },
  title: {
    fontSize: colors.fontSizeTextMaxi,
    fontWeight: 'bold',
    marginBottom: colors.mainPadingHorizantal / 2,
    textAlign: 'center',
    color: colors.text,
  },
  message: {
    fontSize: colors.fontSizeText,
    lineHeight: height * 0.024,
    textAlign: 'center',
    color: colors.text,
  },
  button: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.2,
    borderRadius: height * 0.012,
  },
  buttonText: {
    color: colors.secondText,
    fontSize: colors.fontSizeText,
    fontWeight: 'bold',
  },
});

export default AlertModal;
