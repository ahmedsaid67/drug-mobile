import { StyleSheet } from 'react-native';
import { colors } from './colors';
const styles = StyleSheet.create({

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
        color: '#333',
      },
      infoContainer: {
        marginBottom: 20,
      },
      medText: {
        fontSize: 25,
        color: 'black',
      },
      ingredientText: {
        fontSize: 18,
        color: '#333',
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
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
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
      // buraya birinci button rengi
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
        color: '#333',
      },
      
      instructionsButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        width: '100%',
      },
      instructionsButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
      },
  
});

export default styles;
