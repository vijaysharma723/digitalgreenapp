// tslint:disable: no-string-literal
import { UserService } from "./../services/user.service";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-createsessions",
  templateUrl: "./createsessions.page.html",
  styleUrls: ["./createsessions.page.scss"]
})
export class CreatesessionsPage implements OnInit, OnDestroy {
  @ViewChild("sessionInput", { static: false }) sessionInput;

  sessionDate = new Date();
  topic: string;
  userTopicsDropdown = [];
  userRole: string;
  translateChangeSub: Subscription;

  constructor(
    public router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private toaster: ToasterService,
    public translate: TranslateService
  ) {}

  async ngOnInit() {
    this.userRole = await this.userService.getUserRole();
    this.userTopicsDropdown = await this.userService.getUserTopics(this.translate.currentLang);

    this.translateChangeSub = this.translate.onLangChange.subscribe(async changEvent => {
      console.log('detected language change on create session page ', changEvent);
      this.userTopicsDropdown = await this.userService.getUserTopics(changEvent.lang);
      this.topic = '';
    });
  }

  async ngOnDestroy() {
    this.translateChangeSub.unsubscribe();
  }

  getRandomString() {
    const currentDate = new Date();
    return `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}`;
  }

  get getTopic() {
    if (this.userRole === 'vrp') {
      return this.topic;
    } else {
      return this.translate.instant('Common');
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
          text: this.translate.instant('sessionCreated'),
          colour: "light"
        });
        this.router.navigate(["/sessiondetails", newSession["sessionid"]]);
      } else {
        this.toaster.present({
          text: this.translate.instant('sessionCreationFailed'),
          colour: "danger"
        });
      }
    } else {
      this.toaster.present({
        text: this.translate.instant('selectTopic'),
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
