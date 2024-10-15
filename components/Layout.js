import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, deleteToken } from '../storage/Storage';
import { setUser, userLoggedOut } from '../context/features/user/userSlice';
import { loginSuccess, logout } from '../context/features/auth/loginSlice';
import { showMessage } from '../context/features/message/messageSlice';
import AltBar from './AltBar';
import UstBar from './UstBar';
import { API_ROUTES } from '../utils/constant';
import Message from './Message';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'; 


const Layout = ({ children, currentRoute }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use navigation

  useEffect(() => {
    axios.defaults.headers.common["Accept-Language"] = "tr-tr";
    axios.defaults.baseURL = API_ROUTES;

    // Bağlantı dinleyici
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        navigation.navigate("ErrorPage", { errorMessage: "İnternet bağlantınız yok. Lütfen bağlantınızı kontrol edin." });
      }
    });

    axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        // Handle 401 errors
        if (err.response?.status === 401) {
          axios.defaults.headers.common["Authorization"] = null;
          if (getToken("token"))
            dispatch(
              showMessage({
                message: "Görünüşe göre token'ınız geçersiz olabilir ya da bellekten silinmiş olabilir. Lütfen tekrar giriş yapın.",
                variant: "info",
              })
            );
          deleteToken();
          dispatch(userLoggedOut());
          dispatch(logout());
          return Promise.reject(err);
        }

        // 408 hatası
        if (err.response?.status === 408) {
          dispatch(
            showMessage({
              message: "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.",
              variant: "warning",
            })
          );
          return Promise.reject(err);
        }

        // 429 hatası
        if (err.response?.status === 429) {
          dispatch(
            showMessage({
              message: "Çok fazla istek yaptınız. Lütfen biraz bekleyin.",
              variant: "warning",
            })
          );
          return Promise.reject(err);
        }

        // 500 ve üstü sunucu hataları
        if (err.response?.status >= 500) {
          navigation.navigate("ErrorPage", { errorMessage: "Sunucu hatası. Lütfen daha sonra tekrar deneyin." });
          return Promise.reject(err);
        }

        // Ağ hatası
        if (err.message === "Network Error") {
          navigation.navigate("ErrorPage", { errorMessage: "Ağ hatası. Lütfen bağlantınızı kontrol edin." });
          return Promise.reject(err);
        }

        return Promise.reject(err);
      }
    );

    // Token handling logic remains unchanged
    async function getUser() {
      try {
        const res = await axios.get(API_ROUTES.GET_USER);
        dispatch(loginSuccess());
        dispatch(setUser(res.data));
      } catch (err) {
        console.log(err);
      }
    }

    async function token() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getUser();
      } else {
        console.log("Token not found");
      }
    }
    token();
    return () => {
      unsubscribe(); // Dinleyiciyi kaldır
    };
  }, [dispatch]); // Add navigation to the dependency array

  const showBars = ["Ana Sayfa", "Arama", "Bildirimler", "Hatırlatıcılar"].includes(currentRoute);


  return (
    <View style={{ flex: 1 }}>
      <UstBar showBars={showBars} currentRoute={currentRoute}/>
      <View style={{ flex: 1 }}>
        {children}
      </View>
      {showBars && <AltBar currentRoute={currentRoute} />}
      <Message />
    </View>
  );
};

export default Layout;

