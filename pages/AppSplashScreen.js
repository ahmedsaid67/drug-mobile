import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/colors';
import logo from '../public/drug-logo-transparan.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');


const AppSplashScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const navigation = useNavigation();
  const timeoutRef = useRef(null); // Yönlendirme için zamanlayıcı referansı

  useEffect(() => {
    const checkAgreement = async () => {
      const agreement = await AsyncStorage.getItem('userAgreement08');
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
      await AsyncStorage.setItem('userAgreement08', 'true');
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
      await AsyncStorage.setItem('userAgreement08', 'false'); // Sözleşme iptal edildi
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
              size={height * 0.02 } 
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
        width: height * 0.3, 
        height: height * 0.3,
    },
    appName: {
        fontSize: height * 0.07, 
        fontWeight: 'bold',
        color: colors.uygulamaRengi,
        marginBottom: colors.mainPadingHorizantal, 
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: colors.mainPadingHorizantal
    },
    textContainer: {
        flexDirection: 'row', // Align text elements horizontally
        alignItems: 'center',  // Center vertically within this container
    },
    agreementText: {
      fontSize: height * 0.015,
        color: 'black', // Default text color
    },
    agreementHighlight: {
        color: colors.uygulamaRengi,
        fontSize: height * 0.015,
        marginLeft: height * 0.01,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Arka plan rengini beyaz yap
        padding: colors.mainPadingHorizantal,
        borderRadius: height * 0.012, // İsteğe bağlı: köşeleri yuvarlamak için
    },
    modalHeader: {
        fontSize: colors.fontSizeTextMaxi,
        fontWeight: 'bold',
        color: colors.text, // Başlık rengini koruyun veya istediğiniz renge ayarlayın
        marginBottom: colors.mainPadingHorizantal,
    },
    modalText: {
        color: colors.text, // Yazı rengini colors.text olarak ayarlayın
        fontSize: colors.fontSizeText,
        textAlign: 'left',
        lineHeight: height * 0.028, // Daha fazla boşluk için lineHeight'ı artırın
        marginBottom: colors.mainPadingHorizantal, // Paragraflar arasında boşluk
    },
    modalTextBold: {
        fontWeight: 'bold',
        marginTop: colors.mainPadingHorizantal/2,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: colors.mainPadingHorizantal,
    },
    closeButton: {
        backgroundColor: 'gray',
        padding: colors.mainPadingHorizantal/2,
        borderRadius: height * 0.008,
        flex: 1,
        marginRight: colors.mainPadingHorizantal/2,
    },
    agreeButton: {
        backgroundColor: colors.uygulamaRengi,
        padding: colors.mainPadingHorizantal/2,
        borderRadius: height * 0.008,
        flex: 1,
        marginLeft: colors.mainPadingHorizantal/2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default AppSplashScreen;


