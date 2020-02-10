// tslint:disable: no-string-literal
import { Component, OnInit } from '@angular/core';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';

// sync service
import { SyncService } from './../services/sync/sync.service'; ;
import { SessionService } from './../services/session/session.service';
import { ActivatedRoute } from '@angular/router';

import { CheckStatusService } from '../services/checkStatus/check-status.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit {
  userName: any;
  constructor(
    public checknetwork: ChecknetworkService,
    public network: Network,
    private readonly FilePlugin: File,
    private readonly syncService: SyncService,
    private sessionService: SessionService, private route: ActivatedRoute,
    public checkStatus: CheckStatusService,
    public userService: UserService,
    public file: File
  ) { }
  sessionlist = [];

  async ngOnInit() {
    this.route.url.subscribe(async () => {
      const sessions = await this.sessionService.getSessionList();
      if (!!sessions) { this.sessionlist = sessions; }
    });
  }
  ionViewDidEnter() {
    this.userName = this.userService.loggedInUser['username'];
    this.checknetwork.isOnline.subscribe((val) => {
      if (val === 'Connected') {
        // when online is detected on the sessions page, trigger sync api
        // this.syncUserSessions (true);

      } else if (val === 'Disconnected') {
        console.log('not ok');
      }
    });
    if (this.sessionlist && this.sessionlist.length > 0) {
      this.checkSessionToUpload();
    }
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
  getTimeDiff() {
    const initialtimeStamp = localStorage.getItem('statusTimeStamp');
    const d1 = new Date(initialtimeStamp);
    const currentTimeStamp = new Date().toISOString();
    const d2 = new Date(currentTimeStamp);
    const diffInTime = d2.getTime() - d1.getTime();
    return Math.abs(Math.round(((diffInTime) / 1000) / 60));
  }

  setTopicStatus(index) {
    this.sessionlist[index]['topics'].forEach(async (topic, j) => {
      this.sessionlist[index]['topics'][j]['isUploaded'] = true;
      if (await this.file.checkDir(this.file.externalDataDirectory, 'session')) {
       const fileurl = topic['file_url'];
       const fileResp = await this.file.removeFile(this.file.externalDataDirectory + 'session', fileurl);
       console.log('File deleted', fileResp);
      }
    });
  }
  verifyStatus(sessionData, index) {
    for (let i = index; i < this.sessionlist.length; i++) {
      if (!this.sessionlist[i]['isUploaded']) {
        sessionData.forEach(ele => {
          if (this.sessionlist[i]['sessionid'] === ele['session_id'] && ele['isUploaded']) {
            // discard file in local
            // remove file path from SQL
            // update status
            console.log('update status of session in SQL lite');
            this.sessionlist[i]['isUploaded'] = true;
            if (this.sessionlist[i]['topics']) {
              this.setTopicStatus(index);

            }
          }
        });
      }
    }
    this.sessionService.setSessionList(this.sessionlist);

  }
  checkSessionToUpload() {
    const timeInMin = this.getTimeDiff();
    console.log('Time in minutes', timeInMin);
    if (timeInMin >= 20) {
      // update initial timestamp
      localStorage.setItem('statusTimeStamp', new Date().toISOString());
      // check if there is anything to upload and hit status api on backend
      this.sessionlist.every((item, index) => {
        if (!item['isUploaded']) {
          // hit backend api - call service
          this.checkStatus.getStatus(this.userName).subscribe((obj) => {
            console.log(obj['data']);
            this.verifyStatus(obj['data'], index);
          });
          return false;
        } else {
          return true;
        }
      });
    }
  }
}
