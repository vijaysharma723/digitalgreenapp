import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {LanguageTranslatorService} from '../sharedservices/languagetranslator/language-translator.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss'],
})
export class TranslatorComponent implements OnInit {
 
selectedLanguage : any;
languageList = ['en','hi']

  constructor(
    private translate: TranslateService,
    private languagetranslator : LanguageTranslatorService,
    private readonly storage: Storage,
    private readonly cdr: ChangeDetectorRef,
  ) { 
    this.translate.setDefaultLang('en');
    this.storage.get('app_language').then(storageLang => {
      console.log('setting default language in login translator page  as ', storageLang);
      this.translate.use(storageLang);
      this.selectedLanguage = storageLang;
      this.cdr.detectChanges();
    })
    .catch(error => {
      console.log('error while reading initial language at login', error);
      this.translate.use('en');
      this.cdr.detectChanges();
    });

    languagetranslator.userDetailsObs.subscribe(async (language) => {
      const storageLang = await this.storage.get('app_language').catch(error => Promise.resolve(null));
      console.log('i have recieved login translator', storageLang);
      this.translate.use(storageLang);
      this.selectedLanguage = storageLang;
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {}
  optionsFn(){

    console.log(this.selectedLanguage)
        this.languagetranslator.updateLanguage(this.selectedLanguage);
  }
}

