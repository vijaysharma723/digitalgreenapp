import { SessionService } from "./services/session/session.service";
import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  username: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private sessionService: SessionService,
    public router: Router,
    private storage: Storage,
    translate: TranslateService
  ) {
    this.initializeApp();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("hi");
    this.setUsername();
  }
  displayName(event) {
    console.log("calling", event);
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      console.log('platform ready');

      const timeStamp = await this.storage.get("statusTimeStamp");
      if (!timeStamp) {
        await this.storage.set("statusTimeStamp", new Date().toISOString());
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.platform.resume.subscribe(async () => {
      // this.setUsername();
    });
  }

  setUsername() {
    console.log('setting username in sidebar');
    this.username = this.userService.userDetailsObs.pipe(map(userdetails => {
      console.log('called username ', userdetails);
      if (userdetails) {
        return userdetails['username'];
      } else {
        return '';
      }
    }));
  }

  removeSessionToken() {
    this.userService.endSession();
    this.userService.clearUserData();
    this.sessionService.clearSessionData();
  }
}
