// tslint:disable: no-string-literal
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { File } from '@ionic-native/file/ngx';
import { Network } from '@ionic-native/network/ngx';

// sync service
import { SyncService } from './../services/sync/sync.service';
import { SessionService } from './../services/session/session.service';
import { ActivatedRoute } from '@angular/router';

import { CheckStatusService } from '../services/checkStatus/check-status.service';
import { UserService } from '../services/user.service';
import { Platform } from '@ionic/angular';
import { ToasterService } from '../services/toaster/toaster.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss']
})
export class SessionsPage implements OnInit, OnDestroy {
  userName: any;
  parentFolderDir = 'session';
  isOnline: boolean;
  subscription: any;
  counter = 0;
  sessionlist = [];
  networkSubscription: Subscription;
  constructor(
    public checknetwork: ChecknetworkService,
    public network: Network,
    private readonly syncService: SyncService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    public checkStatus: CheckStatusService,
    public userService: UserService,
    public file: File,
    private toaster: ToasterService,
    private platform: Platform,
    private storage: Storage,
    public translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.route.url.subscribe(async () => {
      const sessions = await this.sessionService.getSessionList();
      if (!!sessions) {
        this.sessionlist = sessions;
      }
    });
  }
  ionViewDidEnter() {
    this.networkSubscription = this.checknetwork.isOnline.subscribe(val => {
      if (val === 'Connected') {
        // when online is detected on the sessions page, trigger sync api
        // no need to sync sessions if user is not logged in
        const loggedInUserDetails = this.userService.loggedInUser;
        if (loggedInUserDetails) {
          console.log('user is logged in, sync its sessions');
          this.syncService.syncUserSessions ();
        } else {
          console.log('user is not logged in, no need to sync its sessions');
        }
      } else if (val === 'Disconnected') {
        console.log('not ok');
      }
    });
    console.log('session page view ok');
    this.userName = this.userService.loggedInUser['username'];
    if (this.sessionlist && this.sessionlist.length > 0 && this.checknetwork.isOnlineStatic) {
      this.checkSessionToUpload();
    }
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.counter < 1) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else {
        // console.log("exitapp");
        navigator['app'].exitApp();
      }
    });
  }

  async getTimeDiff() {
    const initialtimeStamp = await this.storage.get('statusTimeStamp');
    const d1 = new Date(initialtimeStamp);
    const currentTimeStamp = new Date().toISOString();
    const d2 = new Date(currentTimeStamp);
    const diffInTime = d2.getTime() - d1.getTime();
    return Math.abs(Math.round(diffInTime / 1000 / 60));
  }

  setTopicStatus(index) {
    this.sessionlist[index]['topics'].forEach(async (topic, j) => {
      this.setOKStatus(index, j);
    });
  }

  async setOKStatus(sessionIndex, topicIndex, selectedTopicID?: string) {
    // find the matching topic from local and original
    let localTopicIndex = -1;
    if (selectedTopicID !== undefined) {
      // if topicID is supplied, use it to find the index where this topicID is present
      localTopicIndex = this.sessionlist[sessionIndex]['topics'].findIndex(localTopic => {
        return localTopic['topic_id'].toString() === selectedTopicID.toString();
      });
    } else {
      // use the index supplied
      localTopicIndex = topicIndex;
    }

    if (localTopicIndex > -1) {
      // we now know the topic to update in local
      this.sessionlist[sessionIndex]['topics'][localTopicIndex]['isUploaded'] = true;
      // this topic is now synced
      this.sessionlist[sessionIndex]['topics'][localTopicIndex]['topic_status'] = (3).toString();
      if (
        await this.file.checkDir(this.file.externalDataDirectory, 'session')
      ) {
        const fileurl = this.sessionlist[sessionIndex]['topics'][localTopicIndex]['file_url'];
        if (fileurl) {
          try {
            this.file.removeFile(this.file.externalDataDirectory + 'session', fileurl).then(fileResp => {
              if (fileResp['success']) {
                console.log('File deleted', fileResp);
              } else {
                console.log('Maybe file not found, marking it as synced');
              }
              this.sessionlist[sessionIndex]['topics'][localTopicIndex]['file_url'] = '';
            }).catch(fileReadErr => {
              console.log('error while looking for file to delete');
              console.log(fileReadErr);
              if (fileReadErr.code === 1) {
                console.log('Maybe file not found, marking it as synced');
                this.sessionlist[sessionIndex]['topics'][localTopicIndex]['file_url'] = '';
              }
          });
          } catch (fileRemoveErr) {
            console.log('catched file remove error from the status sync service ', fileRemoveErr);
            console.log('since the topic is in remote but the file is not is local, marking it as sync');
          }
          } else {
            console.log('did not detect file url to delete it, ignoring this');
          }
      }
    }
  }

  verifyStatus(sessionData, localIndex) {
    for (let i = localIndex; i < this.sessionlist.length; i++) {
      if (!this.sessionlist[i]['isUploaded']) {
        // sessionData is userSessions in the mongoDB, ele is each session of the user in mongoDB
        sessionData.forEach(ele => {
          if (this.sessionlist[i]['sessionid'] === ele['session_id']) {
            console.log('matched session id ', this.sessionlist[i]['sessionid']);
            if (ele['isUploaded']) {
              this.sessionlist[i]['isUploaded'] = true;
              if (this.sessionlist[i]['topics']) {
                this.setTopicStatus(i);
              }
            } else {
            // update status of individual files only
            this.verifyTopicsOnly(ele['topics'], i);
          }
        }
        });
      }
    }
    this.sessionService.setSessionList(this.sessionlist);
  }

  verifyTopicsOnly(originalTopics, localSessionIndex) {
    //  here we nee to identify the topic we want to update
    originalTopics.forEach((topic, topicIndex) => {
      if (topic['isUploaded']) {
        this.setOKStatus(localSessionIndex, topicIndex, topic['topic_id']);
      }
    });
  }

  async checkSessionToUpload() {
    const timeInMin = await this.getTimeDiff();
    console.log('Time in minutes', timeInMin);
    if (timeInMin >= 1) {
      // update initial timestamp
      await this.storage.set('statusTimeStamp', new Date().toISOString());
      // check if there is anything to upload and hit status api on backend
      this.sessionlist.every((item, index) => {
        if (!item['isUploaded']) {
          // hit backend api - call service
          this.checkStatus.getStatus(this.userName).subscribe(obj => {
            console.log('data recieved from status api is ', obj['data']);
            // sending status api data for specific user with the index of current selected local session
            this.verifyStatus(obj['data'], index);
          });
          return false;
        } else {
          return true;
        }
      });
    }
  }
  presentToast() {
    this.toaster.present({
      text: this.translate.instant('exit'),
      colour: 'light'
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
    this.networkSubscription.unsubscribe();
  }

  ngOnDestroy() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
