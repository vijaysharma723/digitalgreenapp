import { SessionService } from "./services/session/session.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { Storage } from "@ionic/storage";
import { TranslateService } from "@ngx-translate/core";
import { map } from 'rxjs/operators';
import {LanguageTranslatorService} from './shared/sharedservices/languagetranslator/language-translator.service';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  username: any;

selectedLanguage : any = 'en';
languageList = ['en','hi'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    private sessionService: SessionService,
    public router: Router,
    private storage: Storage,
    private translate: TranslateService,
    private languagetranslator : LanguageTranslatorService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.initializeApp();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("hi");
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use("hi");
    this.setUsername();
    this.storage.get('app_language')
    .then(storageLang => {
      console.log("setting default language as ",storageLang);
      this.translate.use(storageLang);
      this.selectedLanguage = storageLang;
      this.cdr.detectChanges();

    })

    .catch(error => {
      console.log('error while reading initial language at login', error);
      this.translate.use('en');
      this.cdr.detectChanges();
    });

    
    languagetranslator.userDetailsObs.subscribe((language) => {
      if (language) {
        this.storage.get('app_language')
        .then(storeLang => {
          console.log('i have recieved in app component', storeLang);
        translate.use(storeLang);
        })
        .catch(error => {
          console.log('error while getting language from storage app component', error);
        });
      }
      else {
        console.log('did not recieve string in app component', language);
      }
      
    });

    // this.storage.get('app_language').then(storageLang => {
    //   if (!storageLang) {
    //     console.log('did not detect language ' ,storageLang);
    //     storageLang = 'hi';
    //   }
    //   console.log('setting default language as at app component as ', storageLang);
    //   this.languagetranslator.updateLanguage(storageLang);
    //   translate.use(storageLang);
    // })
    // .catch(error => {
    //   console.log('error while reading initial language ', error);
    //   translate.use('hi');
    //   this.languagetranslator.updateLanguage('hi');
    // });

  }
  displayName(event) {
    console.log("calling", event);
  }
  optionsFn(){

    console.log('user selected on login ', this.selectedLanguage)
        this.languagetranslator.updateLanguage(this.selectedLanguage);
        this.cdr.detectChanges();
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
