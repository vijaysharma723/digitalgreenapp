import { Injectable } from '@angular/core';
import { of, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { Storage } from "@ionic/storage";
import { TranslateService } from '@ngx-translate/core';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class LanguageTranslatorService {
  private userDetailsObs = new Subject<string>();
  // to give the last emitted value to whoever subscribes it.
  public recentPickedLanguage = this.userDetailsObs
                                    .pipe(
                                      tap(_ => console.log('executing ', _)),
                                      shareReplay(1)
                                      );
  public currentSelectedLanguage = null;
  public defaultLang = 'hi';
  private LANG_KEY = 'app_language';

  constructor(
    private readonly translate: TranslateService,
    private readonly storage: Storage) {
  }

  setInitialAppLanguage() {
    this.translate.setDefaultLang(this.defaultLang);
    this.storage.get(this.LANG_KEY)
    .then(value => {
      value = value || this.defaultLang;
      this.setLanguage(value);
      this.currentSelectedLanguage = value;
    }).catch(lanErr => {
      console.log('Error while reading from local store, setting default');
      this.setLanguage(this.defaultLang);
    });
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.currentSelectedLanguage = lang;
    this.storage.set(this.LANG_KEY, lang).then(success => {
      this.userDetailsObs.next(lang);
    });
  }
}
