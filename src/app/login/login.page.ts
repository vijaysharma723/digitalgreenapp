import { Component, OnInit} from "@angular/core";
import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { UserSyncService } from './services/user-sync-service/user-sync.service';
import { ChecknetworkService } from '../services/checknetwork/checknetwork.service';
import { Subscription} from 'rxjs';
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
  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform,
    private toaster: ToasterService,
    private readonly userSyncSrvc: UserSyncService,
    private readonly checknetwork: ChecknetworkService,
    private readonly translate: TranslateService,
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
        this.toaster.present({
          text: this.translate.instant('loggedInSuccessfully'),
          colour: "light"
        });
        this.username = "";
        this.password = "";
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

  initiateUserSyncProcedure() {
    this.networkSub = this.checknetwork.isOnline.subscribe(val => {
      if (val === 'Connected') {
        // when online is detected on the sessions page, trigger sync api
        console.log('online');
        this.userSyncSrvc.syncUsers();
      } else if (val === 'Disconnected') {
        console.log('user offline, no need to sync users');
      }
    });
  }
}
