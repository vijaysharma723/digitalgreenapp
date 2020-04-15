import { Component, OnInit, OnDestroy} from "@angular/core";
import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService} from '@ngx-translate/core';
import { Platform, LoadingController } from '@ionic/angular';
import { UserSyncService } from './services/user-sync-service/user-sync.service';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { Subscription} from 'rxjs';
import { QuestionsService } from '../services/questions/questions.service';
import { CheckStatusService } from '../services/checkStatus/check-status.service';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  username: string;
  password: string;
  subscription: any;
  counter: number = 0;
  networkSub: Subscription;
  isAlreadySyncingUsers = false;
  storage: any;
  isLoading: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    private toaster: ToasterService,
    private readonly userSyncSrvc: UserSyncService,
    private readonly checknetwork: ChecknetworkService,
    private readonly translate: TranslateService,
    private readonly questionSrvc: QuestionsService,
    private readonly sessionStatus: CheckStatusService,
    private readonly syncService: SessionService,
    private loadingController: LoadingController,

  ) {}

  ngOnInit() {
    console.log('at login page');
  }

  async userLogin() {
    if (!this.username) {
      this.toaster.present({
        text: this.translate.instant('noUsername'),
        colour: "danger"
      });
    } else if (!this.password) {
      this.toaster.present({
        text: this.translate.instant('noPassword'),
        colour: "danger"
      });
    } else {
      // set username as smallCase
      this.username = this.username.toLowerCase();
      const status = await this.userService.validateUserDetails(
        this.username,
        this.password
      );
      if (status === 1) {
        console.log('userName is' ,this.username);
        this.toaster.present({
          text: this.translate.instant('loggedInSuccessfully'),
          colour: "light"
        });
        if (window.navigator.onLine) {
          this.present();
          this.syncServerSessions(this.username);
         } else {
           this.dismissAndNavigate();
         }
        this.username = "";
        this.password = "";
      } else if (status === 0) {
        this.toaster.present({
          text: this.translate.instant('incorrectPassword'),
          colour: "danger"
        });
        this.password = "";
      } else if (status === -10) {
        this.toaster.present({
          text: this.translate.instant('loginFailed'),
          colour: "danger"
        });
        this.password = "";
      } else {
        this.toaster.present({
          text: this.translate.instant('incorrectUsernamePassword'),
          colour: "danger"
        });
        this.username = "";
        this.password = "";
      }
    }
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: this.translate.instant('sessionsLoadingText')
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }


  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.counter < 1) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else {
        console.log("exitapp");
        navigator["app"].exitApp();
      }
    });
    // to track the online and offline status on login page, for syncing users and roles
    this.initiateUserSyncProcedure();
  }
  presentToast() {
    this.toaster.present({
      text: this.translate.instant('exit'),
      colour: "light"
    });
  }
  ionViewWillLeave() {
    console.log('leaving login');
    this.counter = 0;
    this.subscription.unsubscribe();
    this.networkSub.unsubscribe();
  }

  ngOnDestroy() {
     this.networkSub.unsubscribe();
  }

  initiateUserSyncProcedure() {
    this.networkSub = this.checknetwork.isOnline.subscribe(val => {
      console.log('ion view did enter subscription', val);
      if (val === 'Connected') {
        // when online is detected on the sessions page, trigger sync api
        console.log('online');
        this.startSyncing();
      } else if (val === 'Disonnected') {
        console.log('user offline, no need to sync users');
        this.startOfflineSync();
      }
    });
  }

  syncServerSessions(userName) {
    // get session data for logged in user from the server
    // get session data for logged in user from local
    // get default question array assigned to the role of logged in user
    // if the local session list is empty, means we have to sync all the server sessions
    // else match those server sessions which are not present locally and sync them
    // sort the new list with timestamp
    // save the list locally and redirect to sessions page
    const statusSub = this.sessionStatus.getStatus(userName).subscribe(async (response) => {
      statusSub.unsubscribe();
      const localSessionList = await this.syncService.getSessionList();
      const defaultUserQuestions = await this.userService.getUserQuestions();
      if (defaultUserQuestions && localSessionList) {
        // check if there is any object in the server array or not
        if (response && response.hasOwnProperty('status') && response.status.toString() === '200') {
          let newMergedSessions = [];
          const data  = [...response.data];
          if (localSessionList && !localSessionList.length) {
            // no entry to verify in local, simpley add all the remote sessions
            newMergedSessions = this.getServerSessionsAsLocal(data, defaultUserQuestions);
          } else {
            // there are some session in the local storage, check them carefully
            newMergedSessions = this.getServerSessionsWithLocal(data, defaultUserQuestions, localSessionList);
          }
          this.sortAndSaveData(newMergedSessions);
        } else {
          console.log('recieved unexpected response code from the getStatus api for syncing user sessions, check manually');
          this.dismissAndNavigate();
          statusSub.unsubscribe();
        }
      } else {
        console.log('either of localSessionList or defaultUserQuestions was not retireved , will try on next login');
        statusSub.unsubscribe();
      }
    }, error => {
      console.log('An error occured while grabbing the server sessions for syncing, will try on next login', error);
      this.dismissAndNavigate();

    });
  }

  getServerSessionsWithLocal(serverSessions, defaultQuestions, localSessions) {

    const filteredServerSessions = serverSessions.filter(serverSession => {
      const matchedIdx = localSessions.findIndex(localSession => localSession['sessionid'] === serverSession['session_id']);
      if (matchedIdx < 0) {
        // this will be the session which is not present locally
        return true;
      }
      return false;
    });
    const modifiedFilteredSessions = this.getServerSessionsAsLocal(filteredServerSessions, defaultQuestions);
    return [
      ...localSessions,
      ...modifiedFilteredSessions,
    ];
  }

  dismissAndNavigate() {
    this.dismiss();
    this.router.navigate(['/sessions']);
  }

  sortAndSaveData(dataArray) {
    // sort and save the new session array
    dataArray.sort((a, b) => {
      const D1 = new Date(a['created']);
      const D2 = new Date(b['created']);
      return D2.getTime() - D1.getTime();
    });
    // save
    this.syncService.setSessionList(dataArray).then(isSet => {
     this.dismissAndNavigate();
    });
  }

  getServerSessionsAsLocal(serverSessions, defaultQuestions?: object[]) {
    return serverSessions.map(session => {
      return this.syncService.gs(session, defaultQuestions);
    });
  }

  startSyncing() {
    // first sync the roles information
    this.questionSrvc.syncRoleInfo()
    .then(synced => {
      // then sync the user information
      console.log('roles synced properly ', synced);
      this.userSyncSrvc.syncUsers();
    })
    .catch(roleSyncErr => {
      console.error(roleSyncErr);
    });
  }

  async startOfflineSync() {
    this.questionSrvc.syncRoleInfo()
    .then(synced => {
      // then sync the user information
      console.log('roles synced properly ', synced);
      this.userSyncSrvc.syncOfflineUsers();
    })
    .catch(roleSyncErr => {
      console.error(roleSyncErr);
    });
  }

}
