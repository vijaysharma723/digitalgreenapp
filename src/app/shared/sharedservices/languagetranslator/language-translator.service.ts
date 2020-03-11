import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})


export class LanguageTranslatorService {
  public userDetailsObs = new BehaviorSubject<string|null>(null);
  
  constructor(private readonly storage :Storage) { 
  }
  updateLanguage(language:string)
  {
    this.storage.set('app_language', language)
    .then(isSet => {
      this.userDetailsObs.next(language);
    }).catch(setError => {
      console.log('error while setting new language in store language translator', setError);
    })
  }
}
