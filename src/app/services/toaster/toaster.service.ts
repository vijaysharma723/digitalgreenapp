import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

   colorValues = ["primary","secondary","tertiary","success","warning","danger","light","medium","dark"];

  constructor(private toastController: ToastController) { }

    async present({text,place,colour}:
    {text:string,
    place?:'top'|'bottom'|'middle',
    colour:"primary"|"secondary"|"tertiary"|"success"|"warning"|"danger"|"light"|"medium"|"dark"}) 
  {
    if(!!!place) {  
      place = 'top';
    }

    const toast = await this.toastController.create({
      message: text,
      position: place,
      color: colour,
      duration: 3000
    });
    toast.present();
  }
}
