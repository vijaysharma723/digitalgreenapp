import { ActivatedRoute } from "@angular/router";
import { SessionService } from "./services/session/session.service";
import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
  username: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private sessionService: SessionService,
    public router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }
  displayName(event) {
    console.log("calling", event);
  }
  initializeApp() {
    this.platform.ready().then(async () => {
      const timeStamp = await this.storage.get("statusTimeStamp");
      if (!timeStamp) {
        await this.storage.set("statusTimeStamp", new Date().toISOString());
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    this.userService.username.subscribe(username => {
      this.username = username;
    });
  }

  removeSessionToken() {
    this.userService.endSession();
    this.userService.clearUserData();
    this.sessionService.clearSessionData();
  }
}
