import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import {TranslateService,FakeMissingTranslationHandler} from "@ngx-translate/core";
import {Storage } from '@ionic/storage';
import {LanguageTranslatorService} from '../shared/sharedservices/languagetranslator/language-translator.service';


@Component({
  selector: "app-sessiondetails",
  templateUrl: "./sessiondetails.page.html",
  styleUrls: ["./sessiondetails.page.scss"]
})
export class SessiondetailsPage implements OnInit, OnDestroy {
  sessionData;
  parentDirFolder = "session";
  filepath: any;
  topics: Array<any> = [];
  audio: any;
  stop: any;
  rec: any;
  userDetails: any;
  userRole: string;
  message: string;
  topics1 = [];
  topics2 = [];
  topci1Name = '';
  topic2Name = '';
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService,
    private file: File,
    private media: Media,
    private plt: Platform,
    private router: Router,
    private cdr: ChangeDetectorRef,
    translate: TranslateService,
    private readonly storage : Storage,
    private languageTranslator: LanguageTranslatorService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("hi");
    // console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    languageTranslator.userDetailsObs.subscribe((language) => {
      console.log('language recieved in sessions page ', language);
      if (!language) {
        this.storage.get('app_language')
        .then(Storelanguage => {
          console.log('store lang in sessions page is', Storelanguage);
          translate.use(Storelanguage);
          this.cdr.detectChanges();
        })
        .catch(storeErr => {
          console.log('error while getting lang from store, at sssions page', storeErr);
        });
      } else {
        translate.use(language);
        this.cdr.detectChanges();
      }
    });
  }

  async ngOnInit() {
    this.userDetails = await this.userService.getLoggedInUser();
    this.userRole = this.userDetails["role"];
    this.route.params.subscribe(async params => {
      const sessionid = params["sessionid"];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
      console.log('session details by id are ', this.sessionData);
      this.topics = this.sessionData["topics"];
      if(this.userRole === 'vrp' || this.userRole === 'block_officer') {
        this.topics1 = [];
        this.topics2 = [];
        this.topics1.push(this.topics[0]);
        this.topics1.push(this.topics[1]);
        this.topics2.push(this.topics[2]);
        this.topics2.push(this.topics[3]);
      }
      if (this.userRole === 'block_officer') {
        // get the topic name list to show on the question sections for block user
        this.topci1Name = this.topics1[0]['topic_title'];
        this.topic2Name = this.topics2[0]['topic_title'];
      }
    });
  }
  mediaRecording(topic, idx) {
    this.rec = idx;

    this.router.navigate([
      "/sessionrecordingpage",
      this.sessionData.sessionid,
      topic.topic_id
    ]);
  }
  mediaPauseAudio(topic, i) {
    this.audio.pause();
    this.stop = undefined;
    this.cdr.detectChanges();
  }
  // updateTopic(topic, status) {
  //   topic["isPlayed"] = status;
  //   const filterd = this.topics.filter(
  //     elem => elem["isPlayed"] !== topic["isPlayed"]
  //   );
  //   this.topics = [...filterd, topic];
  // }
  mediaPlayAudio(topic, idx) {
    if (this.plt.is("ios")) {
      this.filepath =
        this.file.documentsDirectory.replace(/fiidxle:\/\//g, "") + topic.file_url;
      this.audio = this.media.create(this.filepath);
    } else if (this.plt.is("android")) {
      this.filepath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.parentDirFolder +
        "/" +
        topic.file_url;

      this.audio = this.media.create(this.filepath);
    }
    this.audio.play();
    this.stop = idx;
    this.cdr.detectChanges();

    this.audio.setVolume(0.8);
    this.audio.onStatusUpdate.subscribe(status => {
      if (status.toString() === "4") {
        // player end running
        this.stop = undefined;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (!!this.audio) {
      this.audio.stop();
    }
  }
}
