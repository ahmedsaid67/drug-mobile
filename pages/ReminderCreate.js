import React, { useState,useEffect } from 'react';
// import { useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView,Dimensions, ActivityIndicator, Alert, Linking, Platform, PermissionsAndroid, Keyboard  } from 'react-native';
import ReminderCreateHead from '../components/ReminderCreateHead';
import styles from '../styles/ReminderCreateStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_ROUTES } from '../utils/constant';
import axios from 'axios';
import FormModel from '../components/FormModel';
import HatirlatmaSaatleriModel from '../components/HatirlatmaSaatleriModel';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; 
import moment from 'moment';
import 'moment/locale/tr';
import notifee, { AndroidImportance, TriggerType ,EventType} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; // crypto.getRandomValues için gerekli
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import AlertModal from '../components/AlertModal';
import PermissionBlockedModal from '../components/PermissionBlockedModal';
import { useDispatch } from 'react-redux';
import { showMessage } from '../context/features/message/messageSlice'; // Import the showMessage action
import { colors } from '../styles/colors';


const ReminderCreate = ({ route, navigation }) => {
    const { name } = route.params;
    const [form, setForm] = useState('');
    const [kuvvet, setKuvvet] = useState('');
    const [firstDate, setFirstDate] = useState('');
    const [lastDate, setLastDate] = useState('');
    const [zamanlama, setZamanlama] = useState([]);

    const [modalVisible, setModalVisible] = useState(false); 
    const [kuvvetValue, setKuvvetValue] = useState(''); 
    const [selectedUnit, setSelectedUnit] = useState(''); 

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Tarih Seçici için
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false); // Bitiş Tarihi Seçici

    const [loading,setLoading] = useState(false)

    const units = ['ml','mcg', 'mg','g', 'IU', '%','adet']; 
    // const inputRef = useRef(null); // TextInput için referans oluşturun

    const [formModalVisible, setFormModalVisible] = useState(false); 

    const [zamanlamaModalVisible, setZamanlamaModalVisible] = useState(false); 

    const userMail = useSelector((state) => state.user.email);
    const loginStatus = useSelector((state) => state.login.success);

    const dispatch = useDispatch();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');

    const [alertVisibleBlockedPermission, setAlertVisibleBlockedPermission] = useState(false);
    const [alertMessageBlockedPermission, setAlertMessageBlockedPermission] = useState('');
    const [alertTitleBlockedPermission, setAlertTitleBlockedPermission] = useState('');

    const { height } = Dimensions.get('window');

    const showAlertBlockedPermission = (title, message) => {
        setAlertTitleBlockedPermission(title);
        setAlertMessageBlockedPermission(message);
    
        // 500 milisaniye gecikmeli olarak uyarıyı göster
        setTimeout(() => {
          setAlertVisibleBlockedPermission(true);
        }, 400); // 500 milisaniye = 0.5 saniye
    };

    const showAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
    
        // 500 milisaniye gecikmeli olarak uyarıyı göster
        setTimeout(() => {
            setAlertVisible(true);
        }, 400); // 500 milisaniye = 0.5 saniye
    };



    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (err) {
            console.warn('Error requesting permission:', err);
            return false;
          }
        }
        return true;
      };

    const createNotificationChannel = async () => {
        try {
            const channels = await notifee.getChannels();
            const channelExists = channels.some(channel => channel.id === 'reminder');
    
            if (!channelExists) {
              await notifee.createChannel({
                id: 'reminder',
                name: 'Reminder Channel',
                sound: 'arriving', 
                importance: AndroidImportance.HIGH,
              });
            //   console.log('Notification channel created');
            } else {
            //   console.log('Notification channel already exists, no need to create');
            }
        } catch (error) {
            // console.error('Error checking or creating notification channel:', error);
            dispatch(showMessage({
                message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
                variant: 'error',
            }));
        }
    };



    const handleReminderSave = async () => {
        setLoading(true);
        try {
            // Bildirim izni kontrolü
            const hasPermission = await requestNotificationPermission();
            if (!hasPermission) {
                showAlertBlockedPermission(
                    'İzin Gerekli"',
                    'Hatırlatıcı oluşturabilmek için bildirim izinlerine onay vermeniz gerekmektedir. İzinleri açmak için ayarlara gitmek ister misiniz?',
                );
                return; // İzin verilmediyse işlemi durdur
            }
    
            const now = new Date();
            const currentTime = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    
            const formattedFirstDateSecond = moment(firstDate, 'DD/MM/YYYY').format('DD.MM.YYYY');
            const nowDate = moment(now).format('DD.MM.YYYY');
    
            const sameDay = formattedFirstDateSecond === nowDate;
    
            if (sameDay) {
                const invalidTimes = zamanlama.filter(time => time <= currentTime);
                if (invalidTimes.length > 0) {
                    showAlert(
                        'Uyarı',
                        `Hatırlatıcının ilk tarihi bugünün tarihi seçildiği için, geçmiş bir saat seçemezsiniz. Lütfen girdiğiniz saatleri kontrol ediniz.`
                    );
                    return; // Kaydetme işlemi durdurulur
                }
            }
    
            await createNotificationChannel();
    
            const formattedFirstDate = moment(firstDate, 'DD/MM/YYYY');
            const formattedLastDate = moment(lastDate, 'DD/MM/YYYY');
    
            const data = {
                name: name,
                form,
                kuvvet,
                baslangic_tarihi: formattedFirstDate.format('YYYY-MM-DD'),
                bitis_tarihi: formattedLastDate.format('YYYY-MM-DD'),
                saat_listesi: zamanlama,
            };
    
            const response = await axios.post(API_ROUTES.REMINDERS, data);
    
            // Mevcut bildirimleri al
            const existingNotificationsString = await AsyncStorage.getItem('notifications');
            let notificationsList = [];
    
            // Eğer mevcut bildirimler varsa, parse et
            if (existingNotificationsString) {
                notificationsList = JSON.parse(existingNotificationsString);
            }
    
            // Her gün için bildirim oluştur
            for (let date = formattedFirstDate.clone(); date.isSameOrBefore(formattedLastDate); date.add(1, 'day')) {
                for (let time of zamanlama) {
                    const notificationTime = date.clone().set({
                        hour: parseInt(time.split(':')[0]),
                        minute: parseInt(time.split(':')[1]),
                    });
    
                    const notificationMessage = `${name} - ${kuvvet} - ${form}`;
    
                    const notificationId = uuidv4();  // Benzersiz bir ID oluştur
    
                    await notifee.createTriggerNotification({
                        title: `Hatırlatma: ${time}`,
                        body: notificationMessage,
                        android: {
                            channelId: 'reminder',
                            smallIcon: 'ic_launcher',
                            sound: 'arriving',
                            pressAction: {
                                id: 'default',
                            },
                        },
                        data: {
                            hatirlatici_id: response.data.id,
                            explanations: notificationMessage,
                            saat: time,
                            tarih: notificationTime.format('YYYY-MM-DD'),
                            notificationId: notificationId,  // Bildirim ID'si veriye ekleniyor
                            email:userMail
                        }
                    }, {
                        type: TriggerType.TIMESTAMP,
                        timestamp: notificationTime.valueOf(),
                    });
    
                    // Yeni bildirimi listeye ekle
                    notificationsList.push({
                        id: notificationId,  // Bildirimin ID'sini kaydet
                        hatirlatici_id: response.data.id,
                        explanations: notificationMessage,
                        saat: time,
                        tarih: notificationTime.format('YYYY-MM-DD'), // İstediğin formata göre düzenle
                        email:userMail
                    });
                }
            }
    
            // Güncellenmiş bildirimleri yerel depolamaya kaydet
            await AsyncStorage.setItem('notifications', JSON.stringify(notificationsList));
    
            // Başarıyla kaydedildikten sonra hatırlatıcılar sayfasına git
            navigation.replace('Hatırlatıcılar');
        } catch (error) {
            if (error.message === "Network Error") {
                // Network Error durumu için hiçbir işlem yapılmıyor
                return;
            }
            const status = error?.response?.status;
            
            // Eğer status 401, 408, 429 veya 500 ve üzeri ise, return ile işleme son veriyoruz
            if (status === 401 || status === 408 || status === 429 || status >= 500) {
                return; // Bu durumlarda yanıt verilmemesi için işlem burada sonlanıyor
            }

            dispatch(showMessage({
                message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
                variant: 'error',
            })); 
            console.log(error.response.data);
            
        }finally {
            setLoading(false); // İşlem tamamlandığında loading'i kapat
        }
    };
    
    
    
    

    const handleUnitPress = (unit) => {
        
        Keyboard.dismiss(); // Klavyeyi kapat
        setSelectedUnit(unit); // Seçim yapılacak
    };


    const handleSave = () => {
        if (kuvvetValue && selectedUnit) {
            setKuvvet(`${kuvvetValue} ${selectedUnit}`);
            setModalVisible(false);
        }
    };

    const openModal = () => {
        setModalVisible(true);
        // Use InteractionManager to delay focus until after all interactions are done
        // InteractionManager.runAfterInteractions(() => {
        //     setTimeout(() => {
        //         if (inputRef.current) {
        //             const length = kuvvetValue.length;  // Mevcut değerin uzunluğunu al
        //             inputRef.current.focus();
        //             inputRef.current.setSelection(length);  // Imleci metnin sonuna yerleştir
        //         }
        //     }, 300);  // Adjust the delay if necessary
        // });
    };
    

    const openFormModal = () => {
        setFormModalVisible(true);
    };

    const openZamanlamaModal = () => {
        if (!firstDate) {
            showAlert(
                'Uyarı',
                'Lütfen önce bir başlangıç tarihi seçiniz.'
            );
            return; // Eğer firstDate boşsa, fonksiyonu durdur
        }else if (!lastDate){
            showAlert(
                'Uyarı',
                'Lütfen önce bir bitiş tarihi seçiniz.'
            );
            return;
        }
        setZamanlamaModalVisible(true);
    };



    // Tarih seçici açma ve kapatma işlemleri
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const showEndDatePicker = () => {
        if (!firstDate) {
            showAlert(
                'Uyarı',
                'Lütfen önce bir başlangıç tarihi seçiniz.'
            );
            return; // Eğer firstDate boşsa, fonksiyonu durdur
        }
        setEndDatePickerVisibility(true)
        console.log("check")
    };
    
    const hideEndDatePicker = () => setEndDatePickerVisibility(false);

    const handleConfirmStartDate = (date) => {
        const now = moment(); // Şu anki tarih ve saat
        if (moment(date).isBefore(now, 'minute')) {
            showAlert("Hata", "Başlangıç tarihi geçmiş bir tarih olamaz.");
            hideDatePicker();
            return;
        }
        const formattedDate = moment(date).format('DD/MM/YYYY'); // Gün/Ay/Yıl formatı
        setFirstDate(formattedDate);
        hideDatePicker();
    };
    
    const handleConfirmEndDate = (date) => {
        const now = moment(); // Şu anki tarih ve saat
        const formattedFirstDate = moment(firstDate, 'DD/MM/YYYY'); // İlk tarihi formatla
    
        // Bitiş tarihi geçmiş olamaz
        if (moment(date).isBefore(now, 'minute')) {
            showAlert("Hata", "Bitiş tarihi geçmiş bir tarih olamaz.");
            hideEndDatePicker();
            return;
        }
    
        // Bitiş tarihi, başlangıç tarihinden önce olamaz
        if (moment(date).isBefore(formattedFirstDate, 'day')) {
            showAlert("Hata", "Bitiş tarihi, başlangıç tarihinden önce olamaz.");
            hideEndDatePicker();
            return;
        }
    
        const formattedDate = moment(date).format('DD/MM/YYYY'); // Gün/Ay/Yıl formatı
        setLastDate(formattedDate);
        hideEndDatePicker();
    };
    
    

    if (!loginStatus){
        navigation.navigate('Üyelik')
    }

    return (
        <View style={styles.container} >
            {/* <ReminderCreateHead /> */}
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <View style={styles.secondContainer}>
                    <Text style={styles.title}>Detaylar</Text>
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>İsim</Text>
                            <Text style={styles.input} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
                        </View>

                        <TouchableOpacity style={styles.inputContainer} onPress={openModal}>
                            <Text style={styles.label}>Ölçek</Text>
                            <View style={styles.formRightContainer}>
                                {kuvvet ? (
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.inputForm}>{kuvvet}</Text>
                                ) : (
                                    <Text style={styles.Tree}>-</Text>
                                )}
                                <Ionicons name="chevron-forward-outline" size={height * 0.0225} color={colors.thirdText} />
                            </View>
                        </TouchableOpacity>

                                
                        <TouchableOpacity style={styles.inputContainer} onPress={openFormModal}>
                                <Text style={styles.label}>Form</Text>
                                <View style={styles.formRightContainer}>
                                    {form ? (
                                        <Text style={styles.inputForm}>{form}</Text>
                                    ) : (
                                        <Text style={styles.Tree}>-</Text>
                                    )}
                                    <Ionicons name="chevron-forward-outline" size={height * 0.0225} color={colors.thirdText} />
                                </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.titleSecond}>Zaman</Text>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                            <Text style={styles.label}>Başlangıç Tarihi</Text>
                            <View style={styles.formRightContainer}>
                                {firstDate ? (
                                    <Text style={styles.inputForm}>{firstDate}</Text>
                                ) : (
                                    <Text style={styles.Tree}>-</Text>
                                )}
                                <Ionicons name="chevron-forward-outline" size={height * 0.0225} color={colors.thirdText} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputContainer} onPress={showEndDatePicker}>
                            <Text style={styles.label}>Bitiş Tarihi</Text>
                            <View style={styles.formRightContainer}>
                                {lastDate ? (
                                    <Text style={styles.inputForm}>{lastDate}</Text>
                                ) : (
                                    <Text style={styles.Tree}>-</Text>
                                )}
                                <Ionicons name="chevron-forward-outline" size={height * 0.0225} color={colors.thirdText} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.inputContainerZaman} onPress={openZamanlamaModal}>
                            <Text style={styles.label}>Hatırlatma Saatleri</Text>
                            <View style={styles.zamanlamaRightContainer}>
                                {zamanlama.length > 0 ? (
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.inputZamanlama}>
                                        {zamanlama.join(', ')}
                                    </Text>
                                ) : (
                                    <Text style={styles.Tree}>-</Text>
                                )}
                                <Ionicons name="chevron-forward-outline" size={height * 0.0225} color={colors.thirdText} style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    

                    <Modal visible={modalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.popup}>
                                <View style={styles.popupTitleContainer}>
                                        <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                                            <Ionicons name="arrow-back-outline" size={colors.iconHeight} color={colors.text} />
                                        </TouchableOpacity>
                                    <Text style={styles.popupTitle}>Ölçek Bilgisi</Text>
                                </View>

                                <View style={styles.popupInputContainer} >
                                    <Text style={styles.popupInputText}>Ölçek</Text>
                                    <TextInput
                                        // ref={inputRef}  // TextInput'a referans ekleyin
                                        style={styles.popupInput}
                                        keyboardType="numeric"
                                        value={kuvvetValue}
                                        onChangeText={setKuvvetValue}
                                        maxLength={500}
                                    />
                                </View>

                                <View style={styles.unitsMainContainer}>
                                    <Text style={styles.unitsText}>Birim</Text>
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.unitsContainer}
                                        keyboardShouldPersistTaps="always"
                                    >
                                        {units.map((unit, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.unitButton,
                                                    selectedUnit === unit && styles.unitButtonSelected
                                                ]}
                                                onPress={() => handleUnitPress(unit)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.unitButtonText,
                                                        selectedUnit === unit && styles.unitButtonTextSelected
                                                    ]}
                                                >
                                                    {unit}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                          
                                <View style={styles.popupButtons}>
                                    <TouchableOpacity
                                        style={[styles.saveButton, !(kuvvetValue && selectedUnit) && styles.saveButtonDisabled]}
                                        onPress={handleSave}
                                        disabled={!(kuvvetValue && selectedUnit)}  // Butonun tıklanabilirliğini kontrol eder
                                    >
                                        <Text style={styles.saveButtonText}>Kaydet</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmStartDate}
                        onCancel={hideDatePicker}
                        minimumDate={new Date()}
                    />

                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmEndDate}
                        onCancel={hideEndDatePicker}
                        minimumDate={new Date()}
                    />

                    <FormModel  formModalVisible={formModalVisible} setFormModalVisible={setFormModalVisible} setForm={setForm}/>
                    <HatirlatmaSaatleriModel  zamanlamaModalVisible={zamanlamaModalVisible} setZamanlamaModalVisible={setZamanlamaModalVisible} 
                    setZamanlama={setZamanlama} zamanlama={zamanlama} firstDate={firstDate}/>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (!(kuvvet && form && firstDate && lastDate) || (zamanlama.length === 0)) && styles.saveButtonDisabled
                    ]}
                    disabled={!(kuvvet && form && firstDate && lastDate) || zamanlama.length === 0 || loading}
                    onPress={handleReminderSave}
                >
                    {loading ? (
                        <ActivityIndicator size={colors.iconHeight} color="#ffffff" />  // Yükleme anında dönen animasyon
                    ) : (
                        <Text style={styles.buttonText}>Hatırlatıcı Oluştur</Text>  // Yükleme yoksa buton yazısı
                    )}
                </TouchableOpacity>
            </View>

            <PermissionBlockedModal
                isVisible={alertVisibleBlockedPermission}
                message={alertMessageBlockedPermission}
                title={alertTitleBlockedPermission}
                onClose={() => setAlertVisibleBlockedPermission(false)}
            />

            <AlertModal
                isVisible={alertVisible}
                message={alertMessage}
                title={alertTitle}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
};

export default ReminderCreate;

