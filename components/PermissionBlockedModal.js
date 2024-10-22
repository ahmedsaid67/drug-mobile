import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback,Linking } from 'react-native';
import { colors } from '../styles/colors'; // Renkleri uygun şekilde ayarlayın

const PermissionBlockedModal = ({ isVisible, title, message, onClose }) => {
    const handleGo = () =>{
        onClose()
        Linking.openSettings()
    }
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade" // Animasyon tipini değiştirdik
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <View style={styles.ButonContainer}>
                <TouchableOpacity style={styles.buttonIptal} onPress={onClose}>
                    <Text style={styles.buttonText}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGo}>
                    <Text style={styles.buttonText}>Ayarlar</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'center', // Modalı alt kısma yerleştirdik
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Daha koyu bir arka plan
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    shadowColor: colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: colors.fontSizeTextMaxi, // Başlık için daha büyük bir yazı boyutu
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.text,
  },
  message: {
    fontSize: colors.fontSizeText,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  ButonContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '100%',
    
  },
  button: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    width: '45%',
  },
  buttonIptal: {
    backgroundColor: colors.deleteIcon,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    width: '45%',
  },
  buttonText: {
    color: colors.secondText,
    fontSize: colors.fontSizeText,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PermissionBlockedModal;

