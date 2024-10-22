import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/colors';
import logo from '../public/drug-logo-transparan.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AppSplashScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const navigation = useNavigation();
  const timeoutRef = useRef(null); // Yönlendirme için zamanlayıcı referansı

  useEffect(() => {
    const checkAgreement = async () => {
      const agreement = await AsyncStorage.getItem('userAgreement03');
      if (agreement === 'true') {
        setIsAgreed(true);
        // Sözleşme kabul edildiyse yönlendirme yap
        timeoutRef.current = setTimeout(() => {
          if (isAgreed) { // Yönlendirmeden önce durumu kontrol et
            navigation.replace('Ana Sayfa');
          }
        }, 2000);
      }
    };

    checkAgreement();

    // Cleanup function to clear timeout on unmount
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isAgreed]); // isAgreed değiştiğinde etkilenmesi için bağımlılık listesine ekledik

  const handleAgreement = async () => {
    try {
      await AsyncStorage.setItem('userAgreement03', 'true');
      setIsAgreed(true);
      setModalVisible(false);
      
      // Yönlendirmeyi geciktir
      timeoutRef.current = setTimeout(() => {
        navigation.replace('Ana Sayfa');
      }, 500);
    } catch (error) {
      console.error('Kullanıcı sözleşmesini kaydederken hata:', error);
    }
  };

  const handleCancelAgreement = async () => {
    try {
      await AsyncStorage.setItem('userAgreement03', 'false'); // Sözleşme iptal edildi
      setIsAgreed(false);
      clearTimeout(timeoutRef.current); // Yönlendirmeyi durdur
    } catch (error) {
      console.error('Kullanıcı sözleşmesini iptal ederken hata:', error);
    }
  };

  const handleCheckboxPress = () => {
    setIsAgreed(!isAgreed);
    if (!isAgreed) {
      handleAgreement(); // Sözleşmeyi kabul et
    } else {
      handleCancelAgreement(); // Sözleşmeyi iptal et
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.appName}>Ölçek</Text>
      
      <View style={styles.agreementContainer}>
        <TouchableOpacity onPress={handleCheckboxPress}>
          <Icon 
              name={isAgreed ? "check-box" : "check-box-outline-blank"} 
              size={16} 
              color={isAgreed ? colors.uygulamaRengi : '#d3d3d3'} 
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.agreementHighlight}>Kullanım Sözleşmesi</Text>
          </TouchableOpacity>
          <Text style={styles.agreementText}>'ni kabul ediyorum.</Text>
        </View>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
      >
          <View style={styles.modalView}>
              <Text style={styles.modalHeader}>Kullanıcı Sözleşmesi</Text>
              
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalText}>
                    <Text style={styles.modalTextBold}>1. Taraflar</Text>{"\n"}
                    Bu sözleşme, İlaç Doz Hesaplama ve Hatırlatıcı Oluşturma | Ölçek (“Uygulama”) ile uygulamayı kullanan kullanıcı (“Kullanıcı”) arasında akdedilmiştir. Kullanıcı, Uygulama’yı kullanarak bu sözleşmeyi kabul etmiş sayılacaktır.{"\n\n"}
                    
                    <Text style={styles.modalTextBold}>2. Uygulamanın Amacı</Text>{"\n"}
                    Uygulama, ilaç doz hesaplama ve hatırlatıcı oluşturma hizmeti sunmakta olup, kullanıcıların ilaç ve besin takviyeleri ile ilgili doğru dozaj ve hatırlatmalar almasını sağlamaktadır.{"\n\n"}

                    <Text style={styles.modalTextBold}>3. Kullanıcı Kayıt ve Bilgileri</Text>{"\n"}
                    Uygulama’da doz hesabı işlemleri, kullanıcı kayıt olmadan da gerçekleştirilebilmektedir. Ancak, hatırlatıcı oluşturabilmek için kullanıcıların uygulamaya kayıt olması gerekmektedir. Kullanıcı, kayıt sırasında ya manuel olarak e-posta adresi, ad ve soyad gibi bilgileri sağlayabilir ya da Google ile devam et seçeneğini kullanarak hızlı bir kayıt süreci gerçekleştirebilir. Bu durumda, Google hesabı üzerinden kullanıcıdan alınan e-posta adresi, ad ve soyad bilgileri kullanılarak kayıt işlemi tamamlanır. Kullanıcı, sağladığı bilgilerin doğru ve güncel olduğunu beyan eder. Uygulama, kullanıcıların kimlik bilgilerini doğrudan temin edemediği için, kayıtlı kullanıcıların sunduğu bilgiler üzerinden hizmet vermektedir.{"\n\n"}

                    <Text style={styles.modalTextBold}>4. Galeri ve Bildirim İzni</Text>{"\n"}
                    Uygulama, kullanıcıların profil fotoğrafı ekleyebilmesi için galeri izni talep etmektedir. Ayrıca, uygulama üzerinden bildirimler alabilmeniz için bildirim izni vermeniz gerekmektedir. Bu izinler, kullanıcı deneyimini artırmak amacıyla kullanılacaktır.{"\n\n"}

                    <Text style={styles.modalTextBold}>5. İlaç ve Besin Takviyesi Hizmetleri</Text>{"\n"}
                    Uygulama, kullanıcının yaş, kilo veya hastalık bilgilerini alarak uygun ilaç dozajını sunmaktadır. Ayrıca, kullanıcıya ilaçlar hakkında hatırlatmalar gönderilmektedir.{"\n\n"}

                    <Text style={styles.modalTextBold}>6. Sorumluluk Reddi</Text>{"\n"}
                    Kullanıcı, Uygulama tarafından sağlanan tüm bilgilerin yalnızca bilgilendirme amaçlı olduğunu ve tıbbi tavsiye niteliği taşımadığını kabul eder. Uygulama, sağlık durumu ile ilgili herhangi bir değerlendirme veya tedavi önerisi sunmamaktadır. Kullanıcı, Uygulama’nın sunduğu bilgilerin kullanımı sonucunda oluşabilecek herhangi bir zarar veya kayıptan tamamen sorumlu olduğunu ve Uygulama'nın bu durumdan dolayı herhangi bir yükümlülük taşımadığını kabul eder. Özellikle vurgulamak gerekir ki: Kullanıcı, sağlık durumu ile ilgili olarak her zaman bir doktora veya sağlık uzmanına danışmak zorundadır. Kullanıcı, ilaç kullanımı, dozajları veya tedavi süreçleri hakkında kesinlikle doktor tavsiyesi alması gerektiğinin bilincindedir. Uygulama, bu tavsiyelerin yerine geçmemekte ve kullanıcıların sağlıklarını etkileyen kararları almadan önce mutlaka profesyonel bir sağlık hizmeti sağlayıcısına başvurması gerektiğini hatırlatmaktadır.{"\n\n"}

                    <Text style={styles.modalTextBold}>7. Sözleşmenin Değiştirilmesi</Text>{"\n"}
                    Bu sözleşme, Uygulama tarafından değiştirilebilir. Değişiklikler, Uygulama üzerinden kullanıcıya bildirilecektir. Kullanıcı, değişikliklerden haberdar olmakla ve uygulamayı kullanmaya devam ederek bu değişiklikleri kabul etmekle yükümlüdür.{"\n\n"}

                    <Text style={styles.modalTextBold}>8. Yürürlük</Text>{"\n"}
                    Bu sözleşme, Kullanıcı’nın Uygulama’yı kullanmaya başlamasıyla birlikte yürürlüğe girecektir. Kullanıcı, bu sözleşmeyi kabul ederek Uygulama’yı kullanmaya başlamaktadır.{"\n\n"}

                    <Text style={styles.modalTextBold}>9. Yetkili Mahkeme ve Uygulanacak Hukuk</Text>{"\n"}
                    Bu sözleşmeden doğabilecek her türlü uyuşmazlık Türkiye Cumhuriyeti kanunlarına tabidir. Taraflar arasında ortaya çıkabilecek her türlü uyuşmazlıkta İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
                </Text>
            </ScrollView>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                  >
                      <Text style={styles.buttonText}>Kapat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.agreeButton}
                      onPress={handleAgreement}
                  >
                      <Text style={styles.buttonText}>Onaylıyorum</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.MainContainerBackground,
    },
    logo: {
        width: 250, // Logonun boyutunu biraz küçültün
        height: 250,
    },
    appName: {
        fontSize: 60, // Başlığı büyütün
        fontWeight: 'bold',
        color: colors.uygulamaRengi,
        marginBottom: 40, // Başlık ile sözleşme arasındaki boşluğu artırın
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    textContainer: {
        flexDirection: 'row', // Align text elements horizontally
        alignItems: 'center',  // Center vertically within this container
    },
    agreementText: {
        fontSize: 12,
        color: 'black', // Default text color
    },
    agreementHighlight: {
        color: colors.uygulamaRengi,
        fontSize: 12,
        marginLeft: 4,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Arka plan rengini beyaz yap
        padding: 20,
        borderRadius: 10, // İsteğe bağlı: köşeleri yuvarlamak için
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text, // Başlık rengini koruyun veya istediğiniz renge ayarlayın
        marginBottom: 20,
    },
    modalText: {
        color: colors.text, // Yazı rengini colors.text olarak ayarlayın
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 24, // Daha fazla boşluk için lineHeight'ı artırın
        marginBottom: 15, // Paragraflar arasında boşluk
    },
    modalTextBold: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    modalList: {
        marginLeft: 15, // Madde işaretleri için sol kenar boşluğu
        marginBottom: 15,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    agreeButton: {
        backgroundColor: colors.uygulamaRengi,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AppSplashScreen;

