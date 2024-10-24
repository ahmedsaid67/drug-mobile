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
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: colors.fontSizeTextMaxi,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.text,
        textAlign: 'left',
    },
    titleSecond: {
        fontSize: colors.fontSizeTextMaxi,
        fontWeight: 'bold',
        marginVertical: 20,
        color: colors.text,
        textAlign: 'left',
    },
    inputWrapper: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
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
        paddingVertical: 10,
        height: 50,
        
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
        marginRight: 10,
    },


    inputContainerZaman: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: 10,
        height: 50,
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
        marginHorizontal: 10, // Adjust margin for spacing
        flex: 0, // Prevent the text from taking all available space
        maxWidth: '80%', // Limit width to keep it near the icon
    },
    


    Tree: {
        fontSize: colors.fontSizeTextMaxi,
        color: 'black',
        width: 20,
        height: 35,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
    },
    
    button: {
        backgroundColor: colors.uygulamaRengi,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        position: 'sicky',
        marginVertical:10,
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
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        height: '100%', // Tam ekran popup
    },
    closeIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10
    },
    closeFormIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10
    },
    popupTitle: {
        fontSize: colors.fontSizeTextLarge,
        fontWeight: 'bold',
        textAlign: 'center',
        color:colors.text,
        marginBottom: 20,
    },
    popupInputContainer:{
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        borderRadius: 12, // Daha yuvarlak kenarlar
        fontSize: colors.fontSizeText,
        padding: 20, // İç boşluk ekleyerek daha rahat bir alan
        backgroundColor: 'white', // Beyaz arka plan
        shadowColor: '#000', // Gölge efekti
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    popupInputText : {
        fontSize:colors.fontSizeText,
        color:colors.text,
        fontWeight: 'bold',
        marginBottom:20,
    },
    popupInput: {
        borderBottomWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        fontSize: colors.fontSizeText,
        color: colors.text,
    },

    unitsMainContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.border, // Tüm kenarlarda aynı renk
        borderRadius: 12, // Daha yuvarlak kenarlar
        fontSize: colors.fontSizeText,
        padding: 20, // İç boşluk ekleyerek daha rahat bir alan
        backgroundColor: 'white', // Beyaz arka plan
        shadowColor: '#000', // Gölge efekti
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        
    },

    unitsText : {
        marginBottom:20,
        fontSize:colors.fontSizeText,
        color:colors.text,
        fontWeight: 'bold',
    },

    unitsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 10,
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

    },
    saveButton: {
        backgroundColor: colors.uygulamaRengi,  // Aktif durumdaki renk
        borderRadius: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        position: 'relative',
        bottom:10,
        height:colors.buttonHeight,
    },

    popupFormButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        
    },

    saveFormButton: {
        backgroundColor: colors.uygulamaRengi,  // Aktif durumdaki renk
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        position: 'relative',
        bottom:10,
        height:colors.buttonHeight,
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
        paddingVertical: 16,
        marginVertical: 5,
        borderBottomWidth:1,
        borderBottomColor:colors.border,
        flexDirection:'row',
        alignItems:'center',
    },
    lastFormItem: {
        borderBottomWidth: 0, // Alt çizgiyi kaldır
    },
    formItemText:{
        color:colors.text,
        fontWeight:'bold',
        fontSize:colors.fontSizeText,
    },

    DateMainContainer:{

    },


    DateContainer: {
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 16, // Biraz daha sıkı hale getirildi
      },
      
      DateTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1, // Bu sayede ikonlar ve text arasındaki boşluk kontrol edilebilir
      },
      
      DateText: {
        fontSize: colors.fontSizeText,
        fontWeight: 'bold',
        color: colors.text,
        marginRight: 8, // Metin ile ikon arasındaki boşluk
      },
      
      DeleteIconContainer: {
        marginLeft: 16, // İkonların biraz ayrık durmasını sağlar
      },

      
    DateButonContainer: {
        backgroundColor: '#D9D9E0', // Koyu açık gri ton
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 12,
        padding: 12,
        marginTop: 20,
    },
    
    
    DateButonText: {
        color: colors.text,
        marginLeft: 8,
        fontSize: colors.fontSizeText,
        fontWeight: 'bold',
    },
    

});

export default styles;
