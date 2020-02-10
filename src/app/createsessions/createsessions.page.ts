import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { ToasterService } from "./../services/toaster/toaster.service";

@Component({
  selector: "app-createsessions",
  templateUrl: "./createsessions.page.html",
  styleUrls: ["./createsessions.page.scss"]
})
export class CreatesessionsPage implements OnInit {
  @ViewChild("sessionInput", { static: false }) sessionInput;

  sessionDate = new Date();
  name: string = "farming_" + new Date().getTime();
  constructor(
    public router: Router,
    private sessionService: SessionService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.sessionInput.setFocus();
    }, 0);
  }

  async logForm() {
    if (this.name) {
      const newSession = await this.createNewSession(this.name);
      const result = await this.sessionService.addNewSession(newSession);
      if (result) {
        this.toaster.present({
          text: "Session created successfully.",
          colour: "medium"
        });
        this.router.navigate(["/sessiondetails", newSession["sessionid"]]);
      } else {
        this.toaster.present({
          text: "Unable to create Session.",
          colour: "danger"
        });
      }
    } else {
    }
  }

  async createNewSession(name) {
    const newSessionDetails = {};
    newSessionDetails["name"] = name;
    newSessionDetails["sessionid"] = await this.sessionService.createUniqueId();
    newSessionDetails["created"] = new Date().toISOString();
    newSessionDetails["isUploaded"] = false;
    newSessionDetails["topics"] = [
      {
        topic_id: "1",
        topic_name: "What needs to be improved in the video.",
        isUploaded: false
      },
      {
        topic_id: "2",
        topic_name: "What do you want to learn more.",
        isUploaded: false
      },
      {
        topic_id: "3",
        topic_name: "What are the challenges in general.",
        isUploaded: false
      }
    ];

    return newSessionDetails;
  }
}
