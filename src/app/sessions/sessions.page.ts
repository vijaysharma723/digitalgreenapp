import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(private sharedDataService: SharedDataService, public checknetwork: ChecknetworkService, public dialog: Dialogs,
              public network: Network) {

  }
  sessionlist;

  ngOnInit() {
    this.sessionlist = this.sharedDataService.getSessionList();
  }
  navigateToDetail(session) {
    this.sharedDataService.setSharedData(session.sessionid);
  }
  ionViewDidEnter() {
    this.checknetwork.isOnline.subscribe((val) => {
      if (val === 'Connected') {

      } else if (val === 'Disconnected') {

      }
    });
  }
  openMenu() {
    document.querySelector('ion-menu-controller')
      .open();
  }
}
