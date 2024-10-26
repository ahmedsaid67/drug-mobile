import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import styles from '../styles/HatirlaticilarStyles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_ROUTES } from '../utils/constant';
import notifee from '@notifee/react-native';
import { colors } from '../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HatirlaticiYonetModel = ({ modalVisible, setModalVisible, setSelectedReminder, selectedReminder, setReminders  }) => {

    const [loading,setLoaing] = useState(false)
    const [loadingPouse,setLoaingPouse] = useState(false)

    const today = new Date();
    const isCompleted = () => {
        const endDate = new Date(selectedReminder.bitis_tarihi);
        
        // Eğer bitiş tarihi geçmişse
        if (endDate < today) return true;

        // Eğer bugünkü tarih bitiş tarihiyle aynıysa ve tüm saatler geçmişse
        if (endDate.toDateString() === today.toDateString()) {
            return selectedReminder.hatirlatici_saat.every(({ saat }) => {
                const [hour, minute, second] = saat.split(":");
                const reminderTime = new Date();
                reminderTime.setHours(hour, minute, second);
                return reminderTime < today;
            });
        }

        return false;
    };

    const handleDeleteReminder = async (id) => {
        try {
            setLoaing(true)
            await axios.patch(`${API_ROUTES.REMINDERS}${id}/`, { is_removed: true });
            setReminders(prevReminders => prevReminders.filter(reminder => reminder.id !== id));
            const notifications = await notifee.getTriggerNotifications();
            for (let notification of notifications) {
                if (notification.notification.data.hatirlatici_id === id) {
                    await notifee.cancelTriggerNotification(notification.notification.id);
                    await removeNotificationFromStorage(notification.notification.data.notificationId);
                }
            }
        } catch (error) {
            // console.error("Error deleting reminder:", error);
        } finally {
            setModalVisible(false);
            setSelectedReminder("");
            setLoaing(false)
        }
    };

    const handlePauseReminder = async (id) => {
        try {
            setLoaingPouse(true)
            await axios.put(API_ROUTES.REMINDER_STOPED.replace('data', id));
            setReminders(prevReminders =>
                prevReminders.map(reminder =>
                    reminder.id === id ? { ...reminder, is_stopped: true } : reminder
                )
            );
            const notifications = await notifee.getTriggerNotifications();
            for (let notification of notifications) {
                if (notification.notification.data.hatirlatici_id === id) {
                    await notifee.cancelTriggerNotification(notification.notification.id);
                    await removeNotificationFromStorage(notification.notification.data.notificationId);
                }
            }
        } catch (error) {
            // console.error("Error pausing reminder:", error);
        } finally {
            setModalVisible(false);
            setSelectedReminder("");
            setLoaingPouse(false)
        }
    };

    const removeNotificationFromStorage = async (notificationId) => {
        try {
            const existingNotificationsString = await AsyncStorage.getItem('notifications');
            if (!existingNotificationsString) return;
    
            let notificationsList = JSON.parse(existingNotificationsString);
            notificationsList = notificationsList.filter(notification => notification.id !== notificationId);
    
            await AsyncStorage.setItem('notifications', JSON.stringify(notificationsList));
        } catch (error) {
            // console.error('Error removing notification from storage:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={colors.iconHeight} color={colors} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Hatırlatıcıyı Yönet</Text>
                            <Text style={styles.uyariText}>Hatırlatıcıyı durdurur veya silerseniz, bu hatırlatıcıyla ilgili tüm bildirimler otomatik olarak devre dışı kalacaktır.</Text>
                            <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[
                                    styles.pauseButton,
                                    (selectedReminder.is_stopped || isCompleted()) && styles.disabledButton
                                ]}
                                onPress={() => handlePauseReminder(selectedReminder.id)}
                                disabled={selectedReminder.is_stopped || isCompleted()}
                            >
                                
                                {loadingPouse ? (
                                    <ActivityIndicator size={colors.iconHeight} color="#fff" />
                                ) : (
                                    <Text style={styles.actionText}>
                                        {selectedReminder.is_stopped ? 'Durduruldu' : isCompleted() ? 'Tamamlandı' : 'Durdur'}
                                    </Text>
                                )}
                            </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDeleteReminder(selectedReminder.id)}
                                >
                                    
                                    {loading ? (
                                    <ActivityIndicator size={colors.iconHeight} color="#fff" />
                                ) : (
                                    <Text style={styles.actionText}>Sil</Text>
                                )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default HatirlaticiYonetModel;
