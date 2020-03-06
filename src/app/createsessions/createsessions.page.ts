// tslint:disable: no-string-literal
import { UserService } from "./../services/user.service";
import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { ToasterService } from "./../services/toaster/toaster.service";
import { TranslateService } from '@ngx-translate/core';
import {LanguageTranslatorService} from '../shared/sharedservices/languagetranslator/language-translator.service';
import {Storage} from '@ionic/storage';
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
    public translate: TranslateService,
    private languageTranslator: LanguageTranslatorService,
    private readonly storage: Storage,
    private cdr: ChangeDetectorRef,
    

  ) {
    translate.setDefaultLang("hi");
    // console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.languageTranslator.userDetailsObs.subscribe((language) => {
      console.log('language recieved in create sessions page ', language);
      if (!language) {
        this.storage.get('app_language')
        .then(Storelanguage => {
          console.log('store lang in create sessions page is', Storelanguage);
          
          translate.use(Storelanguage);
          this.cdr.detectChanges();
        })
        .catch(storeErr => {
          console.log('error while getting lang from store, at create sssions page', storeErr);
        });
      } else {
        translate.use(language);
        this.cdr.detectChanges();
      }
    });
  }

  async ngOnInit() {
    // setTimeout(() => {
    //   this.sessionInput.setFocus();
    // }, 0);
    
    this.userRole = await this.userService.getUserRole();
    this.userSessions = await this.userService.getUserTopics();
    if (this.userRole !== 'vrp') {
      const commonText = this.translate.instant('Common');
      this.topic = "commonText" + '_' + this.getRandomString();
      
    }
  }

  getRandomString() {
    const currentDate = new Date();
    return `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}`
  }

  async logForm() {
    if (this.topic) {
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
