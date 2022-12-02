import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController) { }

  async Alert(header, message, subHeader, buttons,css) {
    const alert = await this.alertController.create({
      header:header,
      subHeader : subHeader,
      message: message,
      buttons: buttons,
      cssClass: "alert",
      mode:'ios'
    });
    await alert.present();
  }
  async Alert2(header, message, subHeader, buttons ,inputs,css) {
    const alert = await this.alertController.create({
      header:header,
      subHeader : subHeader,
      message: message,
      buttons: buttons,
      inputs:inputs,
      cssClass: "alert",
      mode:'md'
    });
    await alert.present();
  }
}
