import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(private sharedDataService: SharedDataService){

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
