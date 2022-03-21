import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private toasterCtrl: ToastController
  ) { }

  async showToaster(msg){
    const toaster = await this.toasterCtrl.create({
      message: msg,
      duration: 3000
    });
    toaster.present();
  }
}
