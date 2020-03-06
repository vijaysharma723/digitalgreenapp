import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LanguageTranslatorService } from '../../sharedservices/languagetranslator/language-translator.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    translate: TranslateService,
    languageTranslator : LanguageTranslatorService
  ) { 

    languageTranslator.userDetailsObs.subscribe((language) => {
      translate.use(language);
      console.log(language);
    });
  }

  ngOnInit() {}

  sessionRoute() {
    this.router.navigate(["/sessions"]);
  }

  newSessionRoute() {
    this.router.navigate(["/createsessions"]);
  }
}
