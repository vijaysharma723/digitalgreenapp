import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "./../services/session/session.service";

import { Router } from "@angular/router";
import { File, FileEntry } from "@ionic-native/File/ngx";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureAudioOptions
} from "@ionic-native/media-capture/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ISession } from "../interfaces/ISession";
const MEDIA_FOLDER_NAME = "digitalgreenmediafiles";
@Component({
  selector: "app-session-recording-page",
  templateUrl: "./session-recording-page.page.html",
  styleUrls: ["./session-recording-page.page.scss"]
})
export class SessionRecordingPagePage implements OnInit, OnDestroy {
  sessionData: ISession = {
    sessionid: "",
    name: "",
    created: "",
    isUploaded: false,
    topics: []
  };
  sessionid: string;
  topicName: string;
  recordStarted = false;
  filepath: string;
  storageDirectory: any;
  files = [];
  fileName: string;
  audio: MediaObject;
  audioList = [];
  sessionname: any;
  topicid: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private plt: Platform,
    private file: File,
    private mediacapture: MediaCapture,
    private media: Media,
    private storage: Storage,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    const path = this.file.dataDirectory;
    this.plt.ready().then(() => {
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        data => {
          this.loadFiles();
        },
        err => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false).then(() => {
            this.loadFiles();
          });
        }
      );
    });
    this.route.params.subscribe(async params => {
      this.sessionid = params["sessionid"];
      this.topicName = params["topicname"];
      this.topicid = params["topic_id"];
      this.sessionData = await this.sessionService.getSessionById(
        this.sessionid
      );
    });
  }
  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(res => {
      this.files = res;
      console.log("files: ", res);
    });
  }
  copyFilesToLocal(fullpath) {
    // alert("this full path:");
    // alert(fullpath);

    console.log("full path: ", fullpath);
    let mediapath: string = fullpath;
    if (mediapath.indexOf("file://") < 0) {
      mediapath = "file://" + fullpath;
    }
    const ext = mediapath.split(".").pop();
    const newname =
      this.sessionid + "_" + this.topicName.split(" ").join("") + "." + ext;
    const oldname = mediapath.substr(mediapath.lastIndexOf("/") + 1);

    const copyFrom = mediapath.substr(0, mediapath.lastIndexOf("/") + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
    this.file.copyFile(copyFrom, oldname, copyTo, newname);
  }
  playAudio(f: FileEntry) {
    // alert("this is playing");
    if (this.files[0].name.indexOf(".wav") > -1) {
      const path = f.nativeURL.replace(/^file:\/\//, "");
      const audiofile: MediaObject = this.media.create(path);
      audiofile.play();
    }
  }
  async stopMediaRecording() {
    // alert("stopping");
    this.audio.stopRecord();
    this.recordStarted = false;
    this.audio.release();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    this.storage.set("audiolist", JSON.stringify(this.audioList));
    const updateddata = await this.sessionService.updateSessionTopicData(
      this.sessionid,
      this.topicid,
      "record" + new Date().getTime()
    );
    this.router.navigate(["/sessiondetails", this.sessionid]);
    // alert(this.audioList);
    // this.getAudioList();
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
    this.audio.setVolume(0.8);
  }
  // getAudioList() {
  //   this.storage.get("audiolist").then(res => {
  //     if (res) {
  //       this.audioList = JSON.parse(res);
  //       // alert(" get data");
  //       // alert(JSON.stringify(this.audioList));

  //       console.log(this.audioList);
  //     } else {
  //       // alert("didn't get data");
  //     }
  //   });
  // }
  startMediaRecording() {
    if (this.plt.is("ios")) {
      this.fileName = "record" + new Date().getTime() + ".wav";
      this.filepath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + this.fileName;
      this.audio = this.media.create(this.filepath);
    } else if (this.plt.is("android")) {
      this.fileName = "record" + new Date().getTime() + ".wav";
      this.filepath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") +
        this.fileName;
      this.audio = this.media.create(this.filepath);
    }
    this.recordStarted = true;
    this.audio.startRecord();
  }
  ngOnDestroy() {
    if (!!this.audio) {
      this.audio.stop();
      this.audio.release();
    }

    // this.stopMediaRecording();
  }
}
