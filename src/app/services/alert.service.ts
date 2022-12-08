import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController, private toastController:ToastController) { }

  async Alert(header, message, subHeader, buttons,css) {
    const alert = await this.alertController.create({
      header:header,
      subHeader : subHeader,
      message: message,
      buttons: buttons,
      cssClass: "test",
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
  async toast(message,type:"danger"| "submit") {
   if(type == "danger"){
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    mode:"ios",
    position: "top",
    cssClass:"toast danger"
  });
  await toast.present();
}else{
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: "top",
    mode:"ios",
    cssClass:"toast submit"
  });
  await toast.present();
}
  }
}
