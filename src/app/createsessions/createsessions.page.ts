// tslint:disable: no-string-literal
import { UserService } from "./../services/user.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: "app-createsessions",
  templateUrl: "./createsessions.page.html",
  styleUrls: ["./createsessions.page.scss"]
})
export class CreatesessionsPage implements OnInit {
  @ViewChild("sessionInput", { static: false }) sessionInput;

  sessionDate = new Date();
  topic: string;
  userSessions = [];
  userRole: string;

  constructor(
    public router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private toaster: ToasterService,
    public translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
  }

  async ngOnInit() {
    // setTimeout(() => {
    //   this.sessionInput.setFocus();
    // }, 0);
    this.userRole = await this.userService.getUserRole();
    this.userSessions = await this.userService.getUserTopics();
  }

  getRandomString() {
    const currentDate = new Date();
    return `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}`
  }

  get getTopic() {
    if (this.userRole === 'vrp') {
      return this.topic;
    } else {
      return 'सामान्य';
    }
  }

  async logForm() {
    this.topic = this.getTopic;
    if (this.topic) {
      // add a random string to the session name if the role is vrp
      this.topic += `_${this.getRandomString()}`;
      const newSession = await this.createNewSession(this.topic);
      const result = await this.sessionService.addNewSession(newSession);
      if (result) {
        this.toaster.present({
          text: this.toaster.toasterMessage.sessionCreated,
          colour: "light"
        });
        this.router.navigate(["/sessiondetails", newSession["sessionid"]]);
      } else {
        this.toaster.present({
          text: this.toaster.toasterMessage.sessionCreationFailed,
          colour: "danger"
        });
      }
    } else {
      this.toaster.present({
        text: this.toaster.toasterMessage.selectTopic,
        colour: "danger"
      });
    }
  }

  async createNewSession(name) {
    const newSessionDetails = {};
    newSessionDetails["name"] = name;
    newSessionDetails["sessionid"] = await this.sessionService.createUniqueId();
    newSessionDetails["created"] = new Date().toISOString();
    newSessionDetails["isUploaded"] = false;
    let userTopics = await this.userService.getUserQuestions();
    // assign a default of isUploaded false to all the topics
    userTopics = userTopics.map(topic => {
      topic['isUploaded'] = false;
      return topic;
    });
    newSessionDetails["topics"] = userTopics;
    newSessionDetails["topics_limit"] = userTopics.length;

    return newSessionDetails;
  }
}
