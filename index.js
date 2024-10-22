import { AppRegistry } from 'react-native';
import App from './pages/App4';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';

  async function onBackgroundEvent(event) {
    // Olayı işlemek için gerekli kodu buraya ekleyin
    console.log('Background event:', event);
  }
  
  notifee.onBackgroundEvent(onBackgroundEvent);

AppRegistry.registerComponent(appName, () => App);

