import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class ToasterService {
  public toasterMessage = {
    noUsername: "Please enter Username.",
    noPassword: "Please enter Password.",
    loggedInSuccessfully: "Logged in Successfully.",
    incorrectUsernamePassword: "Please enter correct Username and Password.",
    incorrectPassword: "Please enter correct Password.",
    loginFailed: "Unable to Login.",
    sessionCreated: "Session created successfully.",
    sessionCreationFailed: "Unable to create Session.",
    selectTopic: "Please select Topic.",
    exit: "Press again to exit"
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
