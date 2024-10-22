import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, ActivityIndicator,Linking  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { submitLogout } from '../context/features/auth/loginSlice';
import axios from 'axios';
import { API_ROUTES } from '../utils/constant';
import { useNavigation } from '@react-navigation/native';
import ProfilHeader from '../components/ProfilHeader';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles/ProfileStyles';
import { Keyboard } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { colors } from '../styles/colors';
import { setUser } from '../context/features/user/userSlice';
import AlertModal from '../components/AlertModal';
import PermissionBlockedModal from '../components/PermissionBlockedModal';

function Profil() {
  const user = useSelector((state) => state.user);
  const [profil, setProfil] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  const [alertVisibleBlockedPermission, setAlertVisibleBlockedPermission] = useState(false);
  const [alertMessageBlockedPermission, setAlertMessageBlockedPermission] = useState('');
  const [alertTitleBlockedPermission, setAlertTitleBlockedPermission] = useState('');


  const dispatch = useDispatch();
  const navigation = useNavigation();
  // console.log("user:",user)

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);

    // 500 milisaniye gecikmeli olarak uyarıyı göster
    setTimeout(() => {
        setAlertVisible(true);
    }, 400); // 500 milisaniye = 0.5 saniye
  };

  const showAlertBlockedPermission = (title, message) => {
    setAlertTitleBlockedPermission(title);
    setAlertMessageBlockedPermission(message);

    // 500 milisaniye gecikmeli olarak uyarıyı göster
    setTimeout(() => {
      setAlertVisibleBlockedPermission(true);
    }, 400); // 500 milisaniye = 0.5 saniye
  };




  useEffect(() => {
    const getProfil = async () => {
      try {
        const res = await axios.get(API_ROUTES.GET_PROFIL.replace("data", user.id));
        setProfil(res.data);
        setFirstName(res.data.user?.first_name || '');
        setLastName(res.data.user?.last_name || '');
        setEmail(res.data.user?.email || '');
      } catch (error) {
        // console.error("Profil yüklenemedi:", error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };
    getProfil();
  }, [user.id]);

  const handleLogout = async () => {
    dispatch(submitLogout());
    navigation.navigate('Ana Sayfa');
  };

  const handlePhotoUpdate = async () => {
    try {
      // Galeri erişim iznini kontrol et
      const permissionResult = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      // console.log("permissionResult:", permissionResult);
      const hasPermission = permissionResult === RESULTS.GRANTED
  
      if (hasPermission) {
        // İzin verilmişse galeriyi aç
        const image = await ImagePicker.openPicker({
          cropping: true,
          mediaType: 'photo',
        });
  
        if (image) {
          const formData = new FormData();
          formData.append('photo', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
          });
  
          await axios
            .put(API_ROUTES.PUT_PROFIL.replace("data", user.id), formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              setProfil((prev) => ({
                ...prev,
                photo: response.data.photo || prev.photo,
              }));
              showAlert("Başarıyla Güncellendi", "Profil fotoğrafınız başarıyla güncellendi.");
            })
            .catch((error) => {
              // console.error("Profil fotoğrafı güncellenemedi:", error);
              showAlert("Güncelleme Hatası", "Profil fotoğrafınız güncellenirken bir hata oluştu.");
            });
        } else {
          showAlert("İşlem İptal Edildi", "Hiçbir fotoğraf seçilmedi.");
        }

      } else if (!hasPermission) {
        // Kullanıcı izni kalıcı olarak engellediyse ayarlara yönlendirin
        showAlertBlockedPermission("İzin Gerekli","Galeriden fotoğraf seçebilmek için ayarlardan erişim izni vermeniz gerekiyor.",);
      }
    } catch (error) {
      if (error.message.includes('User cancelled image selection')) {
        // console.log("Kullanıcı fotoğraf seçimini iptal etti.");
        showAlert("İşlem İptal Edildi", "Fotoğraf seçimi iptal edildi.");
      } else {
        // console.error("Fotoğraf seçme hatası:", error);
        showAlert("Fotoğraf Seçme Hatası", "Fotoğraf seçilirken bir hata oluştu.");
      }
    }
  };
  

  const handleProfileUpdate = async () => {
    // Karakter sınırı kontrolü
    if (firstName.length > 30 || lastName.length > 30) {
      showAlert("Güncelleme Hatası", "Ad ve soyad 30 karakterden fazla olamaz.");
      return; // API çağrısını yapmadan önce fonksiyondan çık
    }
  
    // Mevcut veriler ile yeni verileri karşılaştır
    if (
      firstName === profil.user?.first_name &&
      lastName === profil.user?.last_name
    ) {
      showAlert("Güncelleme Yapılmadı", "Profil bilgilerinizi güncellemek için önce bir değişiklik yapmanız gerekiyor.");
      return; // API çağrısını yapmadan önce fonksiyondan çık
    }
  
    try {
      await axios.put(API_ROUTES.PUT_PROFIL.replace("data", user.id), {
        user_first_name: firstName,
        user_last_name: lastName,
      })
      .then(response => {
        setProfil(prev => ({
          ...prev,
          user: {
            ...prev.user,
            first_name: firstName,
            last_name: lastName,
          },
        }));
        dispatch(
          setUser({
            ...user,
            first_name: firstName,
            last_name: lastName,
          })
        );
        showAlert("Başarıyla Güncellendi", "Profil bilgileriniz başarıyla güncellendi.");
      })
    } catch (error) {
      // console.error("Güncelleme hatası:", error);
      showAlert("Güncelleme Hatası", "Profil bilgileriniz güncellenirken bir hata oluştu.");
    } finally {
      Keyboard.dismiss(); // Klavyeyi kapat
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.pageContainer}>
      {/* <ProfilHeader /> */}
      <View style={styles.container}>
      {loading ? ( // Show loading indicator if loading is true
          <View style={styles.loadingConatiner}>
            <ActivityIndicator size="medium" color={colors.uygulamaRengi} />
          </View>
          
        ) : (
          <>
        <View style={styles.profileContainer}>
          {profil.photo ? (
            <View style={styles.profileImageWrapper}>
              <Image source={{ uri: profil.photo }} style={styles.profileImage} />
              <TouchableOpacity style={styles.editIcon} onPress={handlePhotoUpdate}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Icon name="user-circle" size={80} color="#ccc" />
              <TouchableOpacity style={styles.editIcon} onPress={handlePhotoUpdate}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Adınız"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Soyadınız"
        />
        <TextInput
          style={styles.input}
          value={email}
          editable={false} // Kullanıcı değeri değiştiremiyor
          placeholder="E-posta Adresiniz"
        />

        <TouchableOpacity style={styles.updateButton} onPress={handleProfileUpdate}>
          <Text style={styles.updateButtonText}>Profil Güncelle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
        </>
        )}
      </View>
      <AlertModal
        isVisible={alertVisible}
        message={alertMessage}
        title={alertTitle}
        onClose={() => setAlertVisible(false)}
      />
      <PermissionBlockedModal
        isVisible={alertVisibleBlockedPermission}
        message={alertMessageBlockedPermission}
        title={alertTitleBlockedPermission}
        onClose={() => setAlertVisibleBlockedPermission(false)}
      />
    </View>
    </TouchableWithoutFeedback>
  );
}

export default Profil;
