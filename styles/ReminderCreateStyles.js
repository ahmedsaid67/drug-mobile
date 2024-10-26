import { StyleSheet,Dimensions } from 'react-native';
import { colors } from './colors';

const { height } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.MainContainerBackground,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    secondContainer: {
        paddingHorizontal: colors.mainPadingHorizantal,
        paddingVertical: colors.mainPadingVertical,
    },
    title: {
        fontSize: colors.fontSizeTextMaxi,
        fontWeight: 'bold',
        marginBottom: colors.mainPadingHorizantal,
        color: colors.text,
        textAlign: 'left',  // Sol hizalı başlık
    },
    titleSecond: {
        fontSize: colors.fontSizeTextMaxi,
        fontWeight: 'bold',
        marginVertical: colors.mainPadingHorizantal,
        color: colors.text,
        textAlign: 'left',  // Sol hizalı başlık
    },
    inputWrapper: {
        backgroundColor: '#fff',
        borderRadius: height * 0.02,
        padding: colors.mainPadingHorizantal,
        borderWidth: 1, // Hafif bir kenar çizgisi
        borderColor: colors.border, // Açık gri bir kenar rengi
      },
      
    input :{
        color: colors.thirdText,
        fontSize: colors.fontSizeText,
        maxWidth: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        height: height * 0.0610,
    },
    
    formRightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: colors.fontSizeText,
        color: colors.text,
        fontWeight: 'bold',
    },
    inputForm: {
        color: colors.thirdText,
        fontSize: colors.fontSizeText,
        marginRight: height * 0.0125,
    },

    inputContainerZaman: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        height: height * 0.0610,
    },
    
    zamanlamaRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // This allows the container to fill available space
        justifyContent: 'flex-end', // Align items to the right
    },
    inputZamanlama: {
        color: colors.thirdText,
        fontSize: colors.fontSizeText,
        marginHorizontal: height * 0.0125, // Adjust margin for spacing
        flex: 0, // Prevent the text from taking all available space
        maxWidth: '80%', // Limit width to keep it near the icon
        textAlign:"right"
    },
    
    Tree: {
        fontSize: colors.fontSizeTextMaxi,
        color: 'black',
        marginHorizontal: height * 0.0125,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:colors.mainPadingHorizantal,
    },
    
    button: {
        backgroundColor: colors.uygulamaRengi,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height * 0.012,
        alignItems: 'center',
        width: '100%',
        position: 'sicky',
        marginVertical: height * 0.012,
        height:colors.buttonHeight,
    },
    buttonText: {
        color: colors.secondText,
        fontSize: colors.fontSizeText,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Opaklık arttırıldı
    },
    popup: {
        backgroundColor: '#fff',
        paddingHorizontal: colors.mainPadingHorizantal,
        borderTopRightRadius: height * 0.025,
        borderTopLeftRadius: height * 0.025,
        width: '100%',
        height: '100%', // Tam ekran popup
    },
    closeIcon:{
        position:"absolute",
        zIndex: 1,
    },
    popupTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // Adjusts space between items
        alignItems: "center", // Centers items vertically
        width: "100%", // Ensures the container takes the full width
        paddingVertical:colors.mainPadingVertical
    },
    popupTitle: {
        fontSize: colors.fontSizeText,
        fontWeight: 'bold',
        color: colors.text,
        flex: 1, // Allows the text to take available space
        textAlign: "center", // Centers the text within its space
    },
    popupInputContainer:{
        borderWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        borderRadius: height * 0.02, // Daha yuvarlak kenarlar
        fontSize: colors.fontSizeText,
        padding: colors.mainPadingHorizantal, // İç boşluk ekleyerek daha rahat bir alan
        backgroundColor: '#fff', // Beyaz arka plan
    },
    popupInputText : {
        fontSize:colors.fontSizeText,
        color:colors.text,
        marginBottom: colors.mainPadingHorizantal,
    },
    popupInput: {
        borderBottomWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        fontSize: colors.fontSizeText,
        color: colors.text,
        padding:0
    },

    unitsMainContainer: {
        marginTop: colors.mainPadingHorizantal,
        borderWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        borderRadius: height * 0.02, // Daha yuvarlak kenarlar
        fontSize: colors.fontSizeText,
        padding: colors.mainPadingHorizantal, // İç boşluk ekleyerek daha rahat bir alan
        backgroundColor: '#ffff', // Beyaz arka plan
    },

    unitsText : {
        marginBottom:colors.mainPadingHorizantal,
        fontSize:colors.fontSizeText,
        color:colors.text,
    },

    unitsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitButton: {
        paddingVertical: height * 0.012,
        paddingHorizontal: height * 0.02,
        borderRadius: height * 0.012,
        marginRight: height * 0.012,
        backgroundColor: '#eee',
    },
    unitButtonSelected: {
        backgroundColor: colors.uygulamaRengi,
    },
    unitButtonText: {
        fontSize: colors.fontSizeText,
        color: '#444',
    },
    unitButtonTextSelected: {
        color: '#fff',
        
    },
    popupButtons: {
        flex: 1,
        justifyContent: 'flex-end', // Alt kısma hizalar
        paddingVertical:colors.mainPadingHorizantal,

    },
    saveButton: {
        backgroundColor: colors.uygulamaRengi,  // Aktif durumdaki renk
        borderRadius: height * 0.012,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.012,
        position: 'relative',
        height:colors.buttonHeight,
        marginVertical: height * 0.012,

    },

    popupFormButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:colors.mainPadingHorizantal,
    },

    saveFormButton: {
        backgroundColor: colors.uygulamaRengi,  // Aktif durumdaki renk
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: height * 0.012,
        width: '100%',
        position: 'sicky',
        height:colors.buttonHeight,
        marginVertical: height * 0.012,
    },

    saveButtonDisabled: {
        backgroundColor: colors.uygulamaRengiDisabled,  // Buton pasif durumdayken gösterilecek renk
    },
    saveButtonText: {
        fontSize: colors.fontSizeText,
        color: '#fff',
        fontWeight: 'bold',
    },
    
    scrollContainer: {
        flexGrow: 1,
    },
    formItem: {
        paddingVertical: colors.mainPadingHorizantal,
        borderBottomWidth:1,
        borderBottomColor:colors.border,
        flexDirection:'row',
        alignItems:'center',
    },
    firstFormItem:{
        paddingVertical:0,
        paddingBottom: colors.mainPadingHorizantal,
        borderBottomWidth:1,
        borderBottomColor:colors.border,
        flexDirection:'row',
        alignItems:'center',
    },
    lastFormItem: {
        borderBottomWidth: 0, // Alt çizgiyi kaldır
        marginBottom: height * 0.016,
    },
    formItemText:{
        color:colors.text,
        fontSize:colors.fontSizeText,
    },

    DateMainContainer:{

    },


    DateContainer: {
        borderRadius: height * 0.012,
        padding: height * 0.018,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: height * 0.018, // Biraz daha sıkı hale getirildi
      },
      
      DateTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Bu sayede ikonlar ve text arasındaki boşluk kontrol edilebilir
      },
      EditIcon:{
        marginRight: height * 0.01
      },
      
      DateText: {
        fontSize: colors.fontSizeText,
        color: colors.text,
      },
      
      DeleteIconContainer: {
        marginLeft: 16, // İkonların biraz ayrık durmasını sağlar
      },

    DateButonContainer: {
        backgroundColor: '#D9D9E0', // Koyu açık gri ton
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: height * 0.012,
        height:colors.buttonHeight,
        marginTop: colors.mainPadingHorizantal,
    },
    
    DateButonText: {
        color: colors.text,
        marginLeft: height * 0.010,
        fontSize: colors.fontSizeText,
        fontWeight: 'bold',
    },
    

});

export default styles;
