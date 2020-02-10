import { Component, OnInit } from "@angular/core";
import { SessionService } from "./../services/session/session.service";
import { ActivatedRoute } from "@angular/router";
import { Platform } from "@ionic/angular";
import { ToasterService } from "../services/toaster/toaster.service";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.page.html",
  styleUrls: ["./sessions.page.scss"]
})
export class SessionsPage implements OnInit {
  subscription: any;
  counter: number;
  constructor(
    private sessionService: SessionService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private platform: Platform
  ) {}
  sessionlist = [];

  async ngOnInit() {
    this.route.url.subscribe(async () => {
      const sessions = await this.sessionService.getSessionList();
      if (!!sessions) {
        this.sessionlist = sessions;
      }
    });
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      if (this.counter <= 1) {
        this.counter++;
        this.presentToast();
        setTimeout(() => {
          this.counter = 0;
        }, 3000);
      } else {
        // console.log("exitapp");
        navigator["app"].exitApp();
      }
    });
  }
  presentToast() {
    this.toaster.present({
      text: " Press again to exit",
      place: "middle",
      colour: "light"
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
