import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(private sharedDataService: SharedDataService, translate: TranslateService){
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
  }
sessionlist;

  ngOnInit() {
    this.sessionlist = this.sharedDataService.getSessionList();
  }
  navigateToDetail(session) {
    this.sharedDataService.setSharedData(session.sessionid);
  }

      openMenu() {
      document.querySelector('ion-menu-controller')
        .open();
    }
}
