import { SessionService } from "./services/session/session.service";
import { Component, OnInit, ChangeDetectorRef} from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { Storage } from "@ionic/storage";
import { map } from 'rxjs/operators';
import {LanguageTranslatorService} from './shared/sharedservices/languagetranslator/language-translator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit{
  username: any;

selectedLanguage : any = 'en';
sidebarLangSub: Subscription;
languageList = ['en', 'hi'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private sessionService: SessionService,
    public router: Router,
    private storage: Storage,
    private languagetranslator : LanguageTranslatorService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.initializeApp();
    this.setUsername();
    console.log('calling initialize app');
    this.languagetranslator.setInitialAppLanguage();
  }

  ngOnInit() {
    this.sidebarLangSub = this.languagetranslator.recentPickedLanguage.subscribe(lang => {
      if (lang) {
        console.log('language change detectd for the sidebar', lang);
        this.selectedLanguage = lang;
        this.cdr.detectChanges();
      }
    });
  }

  optionsFn(event) {
    console.log('user selected from sidebar', event['detail']['value']);
    this.languagetranslator.setLanguage(event['detail']['value']);
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
  }

  setUsername() {
    console.log('setting username in sidebar');
    this.username = this.userService.userDetailsObs.pipe(map(userdetails => {
      console.log('called username ', userdetails);
      if (!!userdetails) {
        console.log('extracting username');
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
    this.sidebarLangSub.unsubscribe();
  }
}
