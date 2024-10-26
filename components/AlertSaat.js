import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback,Dimensions } from 'react-native';
import { colors } from '../styles/colors'; // Renkleri uygun şekilde ayarlayın

const { height, width } = Dimensions.get('window');

const AlertSaat = ({ isVisible, title, message, onClose,pupupClose,setAddDate,zamanlama }) => {
    const handleGo = () =>{
        onClose()
        setTimeout(() => {
            if(zamanlama.length > 0){
                setAddDate(zamanlama)
            }else{
                setAddDate(["08:00"])
            }
            pupupClose();
        }, 200)
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
              <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
              </View>
              <View style={styles.ButonContainer}>
                <TouchableOpacity style={styles.buttonIptal} onPress={onClose}>
                    <Text style={styles.buttonTextIptal}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleGo}>
                    <Text style={styles.buttonText}>Geri Dön</Text>
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
    padding: colors.mainPadingHorizantal,
    borderRadius: height * 0.024,
    width: '85%',
    shadowColor: colors.border,
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
  ButonContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '100%',
    
  },
  button: {
    backgroundColor: colors.uygulamaRengi,
    paddingVertical: height * 0.015,
    paddingHorizontal: colors.paddingHorizontal,
    borderRadius: height * 0.012,
    width: '45%',
  },
  buttonIptal: {
    paddingVertical: height * 0.015,
    paddingHorizontal: colors.paddingHorizontal,
    borderRadius: height * 0.012,
    width: '45%',
    borderWidth:1,
    borderColor:colors.uygulamaRengi,
  },
  buttonText: {
    color: colors.secondText,
    fontSize: colors.fontSizeText,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextIptal: {
    color: colors.uygulamaRengi,
    fontSize: colors.fontSizeText,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AlertSaat;

