// tslint:disable: no-string-literal
import { Component, OnInit } from '@angular/core';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';

// sync service
import {SyncService} from './../services/sync/sync.service';;
import { SessionService } from "./../services/session/session.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.page.html",
  styleUrls: ["./sessions.page.scss"]
})
export class SessionsPage implements OnInit {
  constructor(
    public checknetwork: ChecknetworkService,
    public network: Network,
    private readonly FilePlugin: File,
    private readonly syncService: SyncService,
    private sessionService: SessionService, private route: ActivatedRoute
    ) {}
  sessionlist = [];

  async ngOnInit() {
    this.route.url.subscribe(async ()=>{
    const sessions = await this.sessionService.getSessionList();
    if (!!sessions) {this.sessionlist = sessions;};
    });
  }
  ionViewDidEnter() {
    this.checknetwork.isOnline.subscribe((val) => {
      if (val === 'Connected') {
        // when online is detected on the sessions page, trigger sync api
        // this.syncUserSessions (true);

      } else if (val === 'Disconnected') {
        console.log('not ok');
      }
    });
  }

  syncUserSessions(ifOnline) {
    if (ifOnline) {
      console.log('initiating sync event');
    // get the file, and send its path to the upload/session api
      console.log(this.FilePlugin.applicationDirectory);
      this.FilePlugin.listDir(this.FilePlugin.externalDataDirectory, 'session')
      .then(dirItems => {
        console.log('items are ', dirItems);
        const fileObj = dirItems[0];
        if (fileObj.isFile) {
          console.log('trying to upoad ', fileObj);
          this.syncService.sendSessionFileUploadRequest(fileObj['nativeURL']);
        }
      });
    }
}
}
