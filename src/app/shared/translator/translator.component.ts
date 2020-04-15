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
    this.sidebarLangSub = this.languagetranslator.recentPickedLanguage.subscribe(lang => {
      if (lang) {
        this.selectedLanguage = lang;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.sidebarLangSub.unsubscribe();
  }

  langSelected(lang) {
    this.languagetranslator.setLanguage(lang);
  }

  optionsFn(event) {
    this.languagetranslator.setLanguage(event['detail']['value']);
  }
}

