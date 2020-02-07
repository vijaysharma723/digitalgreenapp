import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service';

import { File } from '@ionic-native/file/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(private sharedDataService: SharedDataService, private readonly FilePlugin: File, private readonly DialogueProvider: Dialogs) {
  }
sessionlist;

  ngOnInit() {
    this.sessionlist = this.sharedDataService.getSessionList();
  }
  ionViewDidEnter() {
    const IS_ONLINE = true;
    this.syncUserSessions(IS_ONLINE);
  }

  navigateToDetail(session) {
    this.sharedDataService.setSharedData(session.sessionid);
  }

      openMenu() {
      document.querySelector('ion-menu-controller')
        .open();
    }

    syncUserSessions(ifOnline) {
      if (ifOnline) {
        console.log('initiating sync event');
      // get the file, and trigreadDirger the upload event for a particular topic file
      console.log(this.FilePlugin.applicationDirectory);
      this.DialogueProvider.alert(this.FilePlugin.applicationDirectory);
      // this.FilePlugin.checkDir(this.FilePlugin.dataDirectory, 'assets')
      }
    }
}
