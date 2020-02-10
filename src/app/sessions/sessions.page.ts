import { Component, OnInit } from "@angular/core";
import { SessionService } from "./../services/session/session.service";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.page.html",
  styleUrls: ["./sessions.page.scss"]
})
export class SessionsPage implements OnInit {
  constructor(private sessionService: SessionService, private route: ActivatedRoute, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
  }
  sessionlist = [];

  async ngOnInit() {
    this.route.url.subscribe(async ()=>{
    const sessions = await this.sessionService.getSessionList();
    if (!!sessions) this.sessionlist = sessions;
    });
  }
}
