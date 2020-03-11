import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild, ComponentRef, ElementRef, AfterViewInit } from "@angular/core";
import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService, USE_DEFAULT_LANG } from '@ngx-translate/core';
import { TranslateConfigService } from '../translate-config.service';
import { Platform } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import {LanguageTranslatorService} from '../shared/sharedservices/languagetranslator/language-translator.service';
import {TranslatorComponent} from './../shared/translator/translator.component';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit{
  username: string;
  password: string;
  subscription: any;
  counter: number = 0;
  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    private toaster: ToasterService,
    private translate: TranslateService,
    private storage: Storage,
    private languageTranslator: LanguageTranslatorService,
    private readonly cdr: ChangeDetectorRef,
    
  ) {
    translate.setDefaultLang("hi");
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use("hi");
    // this.setUsername();
    this.storage.get('app_language').then(storageLang => {
      if (storageLang)
      console.log('setting default language as login', storageLang);
      translate.use(storageLang);
      this.cdr.detectChanges();
    })
    .catch(error => {
      console.log('error while reading initial language ', error);
      translate.use('en');
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {console.log('at login page');}

  async userLogin() {
    if (!this.username) {
      this.toaster.present({
        text: this.toaster.toasterMessage.noUsername,
        colour: "danger"
      });
    } else if (!this.password) {
      this.toaster.present({
        text: this.toaster.toasterMessage.noPassword,
        colour: "danger"
      });
    } else {
      const status = await this.userService.validateUserDetails(
        this.username,
        this.password
      );
      if (status === 1) {
        this.toaster.present({
          text: this.toaster.toasterMessage.loggedInSuccessfully,
          colour: "light"
        });
        this.username = "";
        this.password = "";
        this.router.navigate(["/sessions"]);
      } else if (status === 0) {
        this.toaster.present({
          text: this.toaster.toasterMessage.incorrectPassword,
          colour: "danger"
        });
        this.password = "";
      } else if (status === -10) {
        this.toaster.present({
          text: this.toaster.toasterMessage.loginFailed,
          colour: "danger"
        });
        this.password = "";
      } else {
        this.toaster.present({
          text: this.toaster.toasterMessage.incorrectUsernamePassword,
          colour: "danger"
        });
        this.username = "";
        this.password = "";
      }
    }
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.counter < 1) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else {
        console.log("exitapp");
        navigator["app"].exitApp();
      }
    });
  }
  presentToast() {
    this.toaster.present({
      text: this.toaster.toasterMessage['exit'],
      colour: "light"
    });
  }
  ionViewWillLeave() {
    console.log('leaving login');
    this.counter = 0;
    this.subscription.unsubscribe();
  }
 
    
}
