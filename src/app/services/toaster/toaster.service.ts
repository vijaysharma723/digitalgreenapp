import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController: ToastController) { }

    async present({text, place, colour}:
    {text: string,
    place?: "top"|"bottom"|"middle",
    colour: "primary"|"secondary"|"tertiary"|"success"|"warning"|"danger"|"light"|"medium"|"dark"}) {
    if (!place) {
      place = "top";
    }

    const toast = await this.toastController.create({
      message: text,
      cssClass: "toaster",
      position: place,
      color: colour,
      duration: 2000
    });
    toast.present();
  }
}
