import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { showMessage } from '../message/messageSlice';
import { setUser,userLoggedOut } from '../user/userSlice';
import { deleteToken,storeToken,getToken } from '../../../storage/Storage';
import { API_ROUTES } from '../../../utils/constant';
import { mailLoadingDone } from './mailLoginSlice';
import { mailLoginLoading } from './mailLoginSlice';

export const submitLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    const response = await axios.post(API_ROUTES.LOGIN, { email, password });

    storeToken(response.data.token);
    axios.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
    dispatch(setUser(response.data.user))

    dispatch(loginSuccess());
    dispatch(
      showMessage({
        message: "Başarıyla giriş yapıldı!",
        variant: "success",
      })
    );

  } catch (err) {
    if (err.message === "Network Error") {
      // Network Error durumu için hiçbir işlem yapılmıyor
      return;
    }
  
    if (err.response) {
      const emailErrorMessage = "Enter a valid email address.";
      // Geçersiz email hatası durumu
      if (err.response.data?.email?.[0] === emailErrorMessage) {
        dispatch(
          showMessage({
            message: "Geçerli bir email adresi giriniz.",
            variant: "error",
          })
        );
        dispatch(loginError("Geçerli bir email adresi giriniz."));
      } else if (
        err.response.status === 401 ||
        err.response.status === 408 ||
        err.response.status === 429 ||
        err.response.status >= 500
      ) {
        // Bu durumlar için herhangi bir işlem yapmıyoruz
        return;
      } else {
        dispatch(showMessage({
          message: "Giriş işleminizde bir sorun oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.",
          variant: "error",
        }));
        dispatch(loginError("Giriş işleminizde bir sorun oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin."));
      }
    }
  } finally {
    dispatch(loginLoadingDone());
  }
};




export const submitCreate = (email, password, firstName, lastName) => async (dispatch) => {
  try {
    dispatch(loginLoading());

    // Kullanıcıyı oluşturma isteği
    const createResponse=await axios.post(API_ROUTES.USERS, {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });

    // Kullanıcıyı otomatik olarak giriş yapma

    // Token'ı saklama ve başlık ayarlama
    storeToken(createResponse.data.token);
    axios.defaults.headers.common["Authorization"] = `Token ${createResponse.data.token}`;

    // Kullanıcı bilgilerini alma
    dispatch(setUser(createResponse.data.user))


    // Başarılı kayıt ve giriş mesajı
    dispatch(loginSuccess());
    dispatch(
      showMessage({
        message: "Kayıt başarılı! Başarıyla giriş yapıldı!",
        variant: "success",
      })
    );

  } catch (err) {
    if (err.message === "Network Error") {
      // Network Error durumu için hiçbir işlem yapılmıyor
      return;
    } 
    // Önce özel durum kodlarını kontrol ediyoruz
    const status = err?.response?.status;
    
    // Eğer status 401, 408, 429 veya 500 ve üzeri ise, return ile işleme son veriyoruz
    if (status === 401 || status === 408 || status === 429 || status >= 500) {
      return; // Bu durumlarda yanıt verilmemesi için işlem burada sonlanıyor
    }
  
  
    if (err?.response?.data?.email) {
      const emailErrors = err.response.data.email;
  
      let errorMessage = "E-posta hatası: ";
      if (emailErrors.includes("Enter a valid email address.")) {
        errorMessage += "Geçerli bir e-posta adresi girin.";
      } else if (emailErrors.includes("custom user with this email already exists.")) {
        errorMessage += "Bu e-posta adresiyle zaten bir kullanıcı var.";
      } else {
        errorMessage += emailErrors.join(', ');
      }
  
      dispatch(showMessage({
        message: errorMessage,
        variant: "error",
      }));
      dispatch(loginError(errorMessage));
      
    } else if (err?.response?.data?.password) {
      const passwordErrors = err.response.data.password;
      dispatch(showMessage({
        message: `Şifre hatası: ${passwordErrors.join(', ')}`,
        variant: "error",
      }));
      dispatch(loginError(passwordErrors.join(', ')));
    } else {
      // Genel hata mesajı
      dispatch(showMessage({
        message: "Kayıt işleminizde bir hata meydana geldi. Lütfen tüm bilgilerinizi doğru girdiğinizden emin olun ve tekrar deneyin.",
        variant: "error",
      }));
      dispatch(loginError("Kayıt işleminizde bir hata meydana geldi. Lütfen tüm bilgilerinizi doğru girdiğinizden emin olun ve tekrar deneyin."));      
    }
  } finally {
    dispatch(loginLoadingDone());
  }
};



export const submitGoogleLogin = (userInfo) => async (dispatch) => {
  try {
    // Başlangıçta yükleniyor durumunu başlat
    dispatch(mailLoginLoading());

    const idToken = userInfo.data.idToken;

    // idToken'ı Django backend'e gönder
    const response = await axios.post(API_ROUTES.GOGLE_LOGIN, 
        { token: idToken },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    // Backend'den alınan token'ı sakla
    const { token } = response.data;

    // Token'ı sakla
    storeToken(token);
    
    // Axios'un varsayılan header'ını güncelle
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;

    // Kullanıcı bilgilerini al
    try {
        const userResponse = await axios.get(API_ROUTES.GET_USER);
        dispatch(setUser(userResponse.data));
    } catch (error) {
        dispatch(
            showMessage({
                message: "Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin.",
                variant: "error",
            })
        );
        // console.error("Kullanıcı bilgileri alınamadı:", error);
        dispatch(loginError("Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyin."));
    }

    // Başarı mesajını göster
    dispatch(loginSuccess());
    dispatch(
        showMessage({
            message: "Giriş işlemi başarıyla tamamlandı!",
            variant: "success",
        })
    );

  } catch (error) {
    if (error.message === "Network Error") {
      // Network Error durumu için hiçbir işlem yapılmıyor
      return;
    }
    // Check if the error is a response from the backend
    if (error.response) {
        const status = error.response.status;

        // 401, 408, 429 ve 500 ve üstü durum kodları için herhangi bir yanıt vermiyoruz
        if (status === 401 || status === 408 || status === 429 || status >= 500) {
            // console.error("Hata durumu:", status);
            return; // Hiçbir işlem yapılmaz
        }

        // Extract the error message from the backend response
        const backendErrorMessage = error.response.data.error || "Bir hata oluştu. Lütfen tekrar deneyin.";

        // Dispatch specific error messages based on the backend response
        dispatch(
            showMessage({
                message: backendErrorMessage,
                variant: "error",
            })
        );

        dispatch(loginError(backendErrorMessage));
    } else {
        // Handle errors that are not related to the backend response (e.g., network errors)
        dispatch(
            showMessage({
                message: "Google ile giriş yapılamadı. Lütfen bağlantınızı kontrol edin ve tekrar deneyin.",
                variant: "error",
            })
        );
        // console.error("Google giriş hatası:", error);
        dispatch(loginError("Google ile giriş yapılamadı. Lütfen tekrar deneyin."));
    }
  }finally {
        // Yükleniyor durumunu sonlandır
        dispatch(mailLoadingDone());
    }
};




export const submitLogout = () => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: API_ROUTES.LOGOUT,
    });

    // Başarılı çıkış işlemi
    axios.defaults.headers.common["Authorization"] = null;
    deleteToken();
    dispatch(userLoggedOut());
    dispatch(logout());
    dispatch(
      showMessage({
        message: "Başarıyla çıkış yapıldı.",
        variant: "success",
      })
    );

  } catch (err) {
    if (err.message === "Network Error") {
      // Network Error durumu için hiçbir işlem yapılmıyor
      return;
    }

    const status = err?.response?.status;

    // 401, 408, 429 ve 500 ve üstü durum kodları için herhangi bir yanıt vermiyoruz
    if (status === 401 || status === 408 || status === 429 || status >= 500) {
      return; // Hiçbir işlem yapılmaz
    }

    // Diğer hata durumları için bir hata mesajı gösteriyoruz
    const error = 'Çıkış işlemi sağlanamadı. Daha sonra tekrar deneyin.';
    dispatch(
      showMessage({
        message: error,
        variant: "error",
      })
    );
    dispatch(loginError(error));

  } finally {
    dispatch(loginLoadingDone());
  }
};






const initialState= {
  success: false,
  loading: false,
  errors: [],
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginLoading: (state, action) => {
      state.loading = true;
    },
    loginLoadingDone: (state, action) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    logout: (state) => {
      state.success = false;
    },
  },
});

export const {
  loginLoading,
  loginLoadingDone,
  loginSuccess,
  loginError,
  logout,
} = loginSlice.actions;

export default loginSlice.reducer;


