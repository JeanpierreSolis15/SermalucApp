import { Component } from '@angular/core';
// import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import { PushNotifications, Token } from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.initializePush();
    });
  }

  async initializePush() {
    await PushNotifications.requestPermissions();
    await PushNotifications.register();

    PushNotifications.addListener('registration', (token: Token) => {
      console.log('El token de registro es ' + token.value);
      localStorage.setItem('tokenFcm', token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.error(
        'Error en el registro de notificaciones push: ' + JSON.stringify(error)
      );
    });
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification) => {
        console.log('Push notification received: ', notification);
      }
    );
  }
}
