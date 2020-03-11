import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {LanguageTranslatorService} from '../sharedservices/languagetranslator/language-translator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss'],
})
export class TranslatorComponent implements OnInit, OnDestroy{

selectedLanguage: any;
languageList = ['en', 'hi'];
sidebarLangSub: Subscription;

  constructor(
    private languagetranslator: LanguageTranslatorService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    console.log('login view for translator active');
    this.sidebarLangSub = this.languagetranslator.recentPickedLanguage.subscribe(lang => {
      if (lang) {
        console.log('language change detectd for the login', lang);
        this.selectedLanguage = lang;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    console.log('unsubscribing on translator component');
    this.sidebarLangSub.unsubscribe();
  }

  optionsFn(event) {
    this.languagetranslator.setLanguage(event['detail']['value']);
  }
}

