import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ToasterService {

  public toasterMessage = {
    noUsername: "कृपया उपयोगकर्ता नाम दर्ज करें।",
    noPassword: "कृप्या पास्वर्ड भरो।",
    loggedInSuccessfully: "सफलतापूर्वक लॉग इन हो चुका है।",
    incorrectUsernamePassword: "कृपया सही उपयोगकर्ता नाम और पासवर्ड दर्ज करें।",
    incorrectPassword: "कृपया सही पासवर्ड दर्ज करें।",
    loginFailed: "लॉग इन करने में असमर्थ रहा।",
    sessionCreated: "सत्र सफलतापूर्वक बनाया गया।",
    sessionCreationFailed: "सत्र बनाने में असमर्थ।",
    selectTopic: "कृपया विषय चुनें।"
  };

  constructor(private toastController: ToastController) {}

  async present({
    text,
    place,
    colour
  }: {
    text: string;
    place?: "top" | "bottom" | "middle";
    colour:
      | "primary"
      | "secondary"
      | "tertiary"
      | "success"
      | "warning"
      | "danger"
      | "light"
      | "medium"
      | "dark";
  }) {
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
