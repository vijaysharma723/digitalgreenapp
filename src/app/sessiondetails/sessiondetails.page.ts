import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import { SharedDataService } from "../shared-data.service";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-sessiondetails",
  templateUrl: "./sessiondetails.page.html",
  styleUrls: ["./sessiondetails.page.scss"]
})
export class SessiondetailsPage implements OnInit, OnDestroy {
  sessionData;
  sessdata;
  filepath: any;
  audio: any;
  played = false;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private file: File,
    private sharedDataSevice: SharedDataService,
    private media: Media,
    private plt: Platform
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async params => {
      console.log("params", params);
      let sessionid = params["sessionid"];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
      debugger;
    });
  }
  mediaPauseAudio() {
    this.audio.pause();
    this.played = false;
  }
  mediaPlayAudio(file, idx) {
    // alert("media playing");
    if (this.plt.is("ios")) {
      this.filepath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filepath);
    } else if (this.plt.is("android")) {
      this.filepath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") + file;
      // alert("media file path:  - ");
      // alert(this.filepath);

      this.audio = this.media.create(this.filepath);
    }
    this.audio.play();
    this.played = true;
    this.audio.setVolume(0.8);
  }
  ngOnDestroy() {
    this.audio.stop();
    // this.stopMediaRecording();
  }
  // UploadTopicFile(topicName) {
  //   this.sharedDataSevice.uploadTopicDataToCloud(this.sessdata.sessionid, topicName);
  // }
}
