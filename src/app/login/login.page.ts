import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../translate-config.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToasterService,
    translate: TranslateService
  ) {
    // private translateConfigService: TranslateConfigService
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
    // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {}

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
}
