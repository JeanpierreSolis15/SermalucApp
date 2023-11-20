import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private loadingController: LoadingController) {}

  async showLoader(message: string = 'Cargando...') {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      mode: 'ios'
    });
    await loading.present();
  }

  async dismissLoader() {
    await this.loadingController.dismiss();
  }
}
