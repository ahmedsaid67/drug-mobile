import {Dimensions } from 'react-native';

const { height } = Dimensions.get('window');


const fontSizeText = height * 0.018
const fontSizeTextMini = height * 0.013
const fontSizeTextLarge = height * 0.023
const fontSizeTextMaxi = height * 0.023
const searchHeight = height * 0.06

const buttonHeight = height * 0.065
const inputHeight = height * 0.08

const iconHeight = height * 0.03
const mainPadingHorizantal = height * 0.025
const mainPadingVertical = height * 0.025

const loadingSize =  height * 0.04



export const colors = {
    MainContainerBackground: '#F6F5FA', // White background
    mainPadingHorizantal : mainPadingHorizantal,
    mainPadingVertical : mainPadingVertical,
    loadingColor:'#fff', // loading anımasyonun rengidir, beyazdır. genelde arka planı renkli butonlarda kullanılır.
    uygulamaRengi:'#1F69FF', // buton arka planı için, ayırt edici textler için, uyarı textler için, uyarı border rengi için kullanılır, sayfada kullanılan ayırt edici icon için.
    uygulamaRengiDisabled:'#A5C4FA',
    text: '#121417', // text rengidir. genelde kullanılan text rengi budur.
    secondText:'#fff', // arka planı koyu olan text ler için oluşturulmuş text rengidir, beyazdır.
    thirdText:'#637685',
    border: '#E3DAF2', // border rengidir.
    icon: '#000000', // iconların rengidir, şuan için siyah rengidir.
    deleteIcon:"#C9102F",
    fontSizeText: fontSizeText,
    fontSizeTextMini : fontSizeTextMini,
    fontSizeTextMaxi: fontSizeTextMaxi,
    fontSizeTextLarge: fontSizeTextLarge,
    inputHeight:inputHeight,
    buttonHeight: buttonHeight,
    iconHeight:iconHeight,
    searchHeight:searchHeight,
    loadingSize:loadingSize,
    uygulamaIkinciRengi:'#601DF0',
    uygulamaIkinciRengiDisabled:'#DDAEFC',
    uygulamaGoogleRengi:'#F2B200',
    uygulamaGoogleRengiDisabled:'#DED300 ',
  };