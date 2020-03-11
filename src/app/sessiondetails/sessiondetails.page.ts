import { UserService } from './../services/user.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { File} from "@ionic-native/file/ngx";
import { Media} from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import {LanguageTranslatorService} from '../shared/sharedservices/languagetranslator/language-translator.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToasterService } from '../services/toaster/toaster.service';
import { Subscription } from 'rxjs';

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
  languageSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private userService: UserService,
    private file: File,
    private media: Media,
    private plt: Platform,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private languageTranslator: LanguageTranslatorService,
    private readonly androidPermissions: AndroidPermissions,
    private readonly toaster: ToasterService,
  ) {}

  async ngOnInit() {
    this.languageSub = this.languageTranslator.recentPickedLanguage.subscribe(lang => {
      if (lang) {
        console.log('recieved language in sessionDetails page as well ', lang);
      }
    });
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

  promptPermissions() {
    return new Promise((res, rej) => {
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE])
        .then(recievedPermissions => {
          console.log('total permission accept ', recievedPermissions);
          res(recievedPermissions.hasPermission);
        })
        .catch(ignoredPermissoins => {
          console.log('total permissions reject ', ignoredPermissoins);
          rej(ignoredPermissoins);
        })


    })
  }
  mediaRecording(topic, idx) {

    this.promptPermissions().then(granted => {
      if (granted) {
        this.rec = idx;

        this.router.navigate([
          "/sessionrecordingpage",
          this.sessionData.sessionid,
          topic.topic_id
        ]);
      } else {
        this.toaster.present({
          text: this.toaster.toasterMessage.permissionFailedMsg,
          colour: "danger"
        });
      }
    }).catch(failed => {
      console.log('recieved error while granting permissions', failed);
      this.toaster.present({
        text: this.toaster.toasterMessage.abruptErrorOnPermissions,
        colour: "danger"
      });
    })
  }
  mediaPauseAudio(topic, i) {
    this.audio.pause();
    this.stop = undefined;
    this.cdr.detectChanges();
  }

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
    this.languageSub.unsubscribe();
    if (!!this.audio) {
      this.audio.stop();
    }
  }
}
