import { Component, OnInit } from "@angular/core";
import { SessionService } from "./../services/session/session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.page.html",
  styleUrls: ["./sessions.page.scss"]
})
export class SessionsPage implements OnInit {
  constructor(private sessionService: SessionService, private route: Router) {}
  sessionlist = [];

  async ngOnInit() {
    const sessions = await this.sessionService.getSessionList();
    if (!!sessions) this.sessionlist = sessions;
    else {
      this.route.navigate(["/createsessions"]);
    }
  }
}
