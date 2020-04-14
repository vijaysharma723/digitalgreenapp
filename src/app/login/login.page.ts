import { Component, OnInit} from "@angular/core";
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
export class LoginPage implements OnInit{
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
      const status = await this.userService.validateUserDetails(
        this.username,
        this.password
      );
      if (status === 1) {
        console.log('userName is' ,this.username);
        if (window.navigator.onLine) {
         this.present();
         console.log("Hello world stop loader");
         this.syncServerSessions(this.username)
        
          
        }
        this.toaster.present({
          text: this.translate.instant('loggedInSuccessfully'),
          colour: "light"
        });
        this.username = "";
        this.password = "";
        this.dismiss();
        this.router.navigate(["/sessions"]);
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
      message: 'Loading sessions...'
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
      console.log('ion view did enter subscription', val)
      
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
  
  syncServerSessions(userName)
  {
    this.sessionStatus.getStatus(userName).subscribe(async(response) =>
      {
        // debugger;
        console.log('Hello world',response);
        let localStorage = await this.syncService.getSessionList();
        let defaultQuestions = await this.userService.getUserQuestions();
        console.log('localStorage',localStorage);
        console.log('default questions',defaultQuestions);
        if (defaultQuestions) {
// check if there is any object in the server array or not
if (response && response.data.length) {
  // let newStorageSessions = [];
 
    if(localStorage && !localStorage.length)
      { // no entry to verify in local, simpley add all the remote sessions
        response.data.forEach((element:any) => {
           const generatedSession = this.syncService.generateSession(element, defaultQuestions);
           console.log('Generated session and default questions',generatedSession);
           localStorage.push(generatedSession);
           this.dismiss();

          });
      } 
      else {
        response.data.forEach((element:any) => {
        let matchedSession = localStorage.filter(localSesion => {
        return element.session_id === localSesion.sessionid;
          });
          console.log('matched session = ',matchedSession);
      if (!matchedSession.length) {
        console.log('can insert the server session ', element);
        const generatedSession = this.syncService.generateSession(element, defaultQuestions);
           localStorage.push(generatedSession);
      }
    });
      }

  
    // sort and save the new session array
    localStorage.sort((a,b) => {
      const D1 = new Date(a['created']);
      const D2 = new Date(b['created']);
      return D1.getTime() - D2.getTime();
    });
    // save
    this.syncService.setSessionList(localStorage).then(isSet => {
      
    });
    this.dismiss();
} else {
  console.log('No entry to sync from server');
  this.dismiss();
 }

     } else {

          
        }
        
        
      // return response;
      })
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
