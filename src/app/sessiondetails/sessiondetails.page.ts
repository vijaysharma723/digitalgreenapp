import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import {
  TranslateService,
  FakeMissingTranslationHandler
} from "@ngx-translate/core";

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
  message: string;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private file: File,
    private media: Media,
    private plt: Platform,
    private router: Router,
    private cdr: ChangeDetectorRef,
    translate: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");
    console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("hi");
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const sessionid = params["sessionid"];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
      this.topics = this.sessionData["topics"].map(element => {
        element["isPlayed"] = false;
        return element;
      });
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
        this.file.documentsDirectory.replace(/file:\/\//g, "") + topic.file_url;
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
