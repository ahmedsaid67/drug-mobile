import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from '../styles/ReminderCreateStyles';
import moment from 'moment';
import 'moment/locale/tr';
import AlertModal from '../components/AlertModal'
import { colors } from '../styles/colors';
import AlertSaat from '../components/AlertSaat';

const HatirlatmaSaatleriModel = ({ zamanlamaModalVisible, setZamanlamaModalVisible, setZamanlama, zamanlama, firstDate }) => {

    const [addDate, setAddDate] = useState(['08:00']); // Saatleri tutacak state
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Saat picker görünürlüğü için
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null); // Hangi saatin düzenlendiğini tutmak için

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const [alertSaatVisible, setAlertSaatVisible] = useState(false);
    const [alertSaatMessage, setAlertSaatMessage] = useState('');
    const [alertSaatTitle, setAlertSaatTitle] = useState('');

    const showAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
    
        // 500 milisaniye gecikmeli olarak uyarıyı göster
        setTimeout(() => {
            setAlertVisible(true);
        }, 400); // 500 milisaniye = 0.5 saniye
    };

    const showAlertSaat = (title, message) => {
        setAlertSaatTitle(title);
        setAlertSaatMessage(message);
    
        // 500 milisaniye gecikmeli olarak uyarıyı göster
        setTimeout(() => {
            setAlertSaatVisible(true);
        }, 400); // 500 milisaniye = 0.5 saniye
    };

    // Saat picker açma
    const showDatePicker = (index) => {
        setSelectedTimeIndex(index); // Hangi saat tıklandıysa onu kaydediyoruz
        setDatePickerVisibility(true);
    };

    // Saat picker kapama
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setSelectedTimeIndex(null); // Seçimi sıfırlıyoruz
    };

    // Saat seçildiğinde çalışacak fonksiyon
    const handleConfirm = (date) => {
        const formattedTime = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        if (selectedTimeIndex !== null) {
            // Eğer bir saat güncelleniyorsa
            const updatedTimes = [...addDate];
            updatedTimes[selectedTimeIndex] = formattedTime; // Güncelleme
            setAddDate(updatedTimes);
        } else {
            // Yeni saat ekleniyorsa
            setAddDate([...addDate, formattedTime]);
        }
        hideDatePicker(); // Picker'ı kapat
    };

    // Saat silme fonksiyonu
    const handleDelete = (index) => {
        const updatedTimes = addDate.filter((_, i) => i !== index); // Seçilen saati filtreleyerek listeden çıkarma
        setAddDate(updatedTimes);
    };

    // Saat karşılaştırma fonksiyonu
    const handleSave = () => {
        const now = new Date(); // Şu anki tarih ve saat
        const currentTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        // firstDate'i düzgün bir formata çevir
        const formattedFirstDate = moment(firstDate, 'DD/MM/YYYY').format('DD.MM.YYYY'); // "29/09/2024" => "29.09.2024"
        const nowDate = moment(now).format('DD.MM.YYYY'); // Şu anki tarihi formatla


        const sameDay = formattedFirstDate === nowDate; // firstDate ve şu anki tarih karşılaştırması

        if (sameDay) {
            const invalidTimes = addDate.filter(time => time <= currentTime); // Şu anki saatten önceki saatler

            if (invalidTimes.length > 0) {
                // Geçersiz saatleri uyarı mesajında göster
                showAlert(
                    'Uyarı',
                    `Hatırlatıcının ilk tarihi bugünün tarihi olduğu için, geçmiş bir saat seçemezsiniz. Lütfen girdiğiniz saatleri kontrol ediniz.`
                );
                return; // Kaydetme işlemi durdurulur
            }
        }

        setZamanlama(addDate); // Seçilen saatleri kaydet
        setZamanlamaModalVisible(false); // Modal'ı kapat
    };

    const handleClose = () => {
        if (addDate.length == 1 && addDate[0]==="08:00"){
            setZamanlamaModalVisible(false); // Modal'ı kapat
        }else{
            showAlertSaat("Kaydedilmemiş Değişiklikler", "Geri dönmek istediğinize emin misiniz? Yaptığınız değişiklikler kaybolacaktır.")
        }
    }

    return (
        <Modal visible={zamanlamaModalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.popup}>
                    <View style={styles.popupTitleContainer}>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => handleClose()}>
                            <Ionicons name="arrow-back-outline" size={colors.iconHeight} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.popupTitle}>Hatırlatma Saatleri</Text>
                    </View>

                    <ScrollView style={styles.DateMainContainer} showsVerticalScrollIndicator={false}>
                        {/* Seçilen saatleri listeleme */}
                        {addDate.map((time, index) => (
                            <View key={index} style={styles.DateContainer}>
                                <TouchableOpacity onPress={() => showDatePicker(index)} style={styles.DateTextContainer}>
                                    <Ionicons name="settings-outline" size={colors.iconHeight} color="#000" style={styles.EditIcon} /> 
                                    <Text style={styles.DateText}>{time}</Text>
                                </TouchableOpacity>
                                {addDate.length >1 && (
                                    <TouchableOpacity onPress={() => handleDelete(index)} style={styles.DeleteIconContainer}>
                                        <Ionicons name="trash-outline" size={colors.iconHeight} color="#000"/>
                                    </TouchableOpacity>
                                )}
                                
                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.DateButonContainer} onPress={() => showDatePicker(null)}>
                        <Ionicons name="add" size={colors.iconHeight} color="#000" />
                        <Text style={styles.DateButonText}>Saat Ekle</Text>
                    </TouchableOpacity>

                    <View style={styles.popupFormButtons}>
                        <TouchableOpacity
                            style={[styles.saveFormButton, addDate.length===0 && styles.saveButtonDisabled]}
                            onPress={handleSave}
                            disabled={addDate.length===0}
                        >
                            <Text style={styles.saveButtonText}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Saat seçimi için modal */}
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="time"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        is24Hour={true} // 24 saat formatı kullanımı
                        locale="tr-TR" // Türkçe dil ayarı
                    />
                    <AlertModal
                        isVisible={alertVisible}
                        message={alertMessage}
                        title={alertTitle}
                        onClose={() => setAlertVisible(false)}
                    />
                    <AlertSaat
                        isVisible={alertSaatVisible}
                        message={alertSaatMessage}
                        title={alertSaatTitle}
                        onClose={() => setAlertSaatVisible(false)}
                        pupupClose={() => setZamanlamaModalVisible(false)}
                        setAddDate={setAddDate}
                        zamanlama={zamanlama}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default HatirlatmaSaatleriModel;


