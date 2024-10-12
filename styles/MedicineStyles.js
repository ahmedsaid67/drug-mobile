import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
    // Genel stil ayarları
    container: {
        flexGrow: 1,
        backgroundColor: colors.MainContainerBackground,
        padding: 20,
    },
    adContainer: {
        backgroundColor: '#ccc',
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    adText: {
        fontSize: 18,
        color: 'black', // Metin rengi siyah yapıldı
    },
    infoContainer: {
        marginBottom: 20,
        color: 'black',
    },
    medText: {
        fontSize: 25,
        color: 'black', // Metin rengi siyah yapıldı
    },
    ingredientText: {
        fontSize: 18,
        color: 'black', // Metin rengi siyah yapıldı
    },
    inputContainer: {
        marginVertical: 20,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 18,
        marginRight: 10,
        color: 'black', // Metin rengi siyah yapıldı
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        color: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    button: {
        flex: 1,
        backgroundColor: '#007BFF',
        padding: 15,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    explanationContainer: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        marginBottom: 20,
    },
    explanationText: {
        fontSize: 16,
        color: 'black', // Metin rengi siyah yapıldı
    },
    instructionsButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        width: '100%',
    },
    instructionsButtonText: {
        color: 'black', // Metin rengi siyah yapıldı
        textAlign: 'center',
        fontSize: 16,
    },
    // Yeni eklenen stiller
    resultContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#e0f7fa',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 18,
        color: 'black', // Metin rengi siyah yapıldı
    },
    errorContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#ffebee',
        borderRadius: 5,
    },
    errorText: {
        color: 'black', // Metin rengi siyah yapıldı
        fontSize: 16,
    },
    loadingContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: 'black', // Metin rengi siyah yapıldı
    },
    kiloInputContainer: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#f1f8e9',
        borderRadius: 5,
    },
    kiloInputLabel: {
        fontSize: 18,
        color: 'black', // Metin rengi siyah yapıldı
    },
    kiloInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    kiloButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    kiloButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default styles;
