import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../translate-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

// login = {};
  constructor(translate: TranslateService) {
   // private translateConfigService: TranslateConfigService
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
    // this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
   }

  ngOnInit() {
  }

  // languageChanged(){
  //   this.translateConfigService.setLanguage(this.selectedLanguage);
  // }

// submit() {
//   console.log();
// }
}
