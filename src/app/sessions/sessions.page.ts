import { Component, OnInit } from "@angular/core";
import { SessionService } from "./../services/session/session.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.page.html",
  styleUrls: ["./sessions.page.scss"]
})
export class SessionsPage implements OnInit {
  constructor(private sessionService: SessionService, private route: ActivatedRoute) {}
  sessionlist = [];

  async ngOnInit() {
    this.route.url.subscribe(async () => {
    const sessions = await this.sessionService.getSessionList();
    if (!!sessions) {
      this.sessionlist = sessions;
    }
    });
  }
}
