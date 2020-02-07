import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedDataService } from "../shared-data.service";
import { Router } from "@angular/router";
import { File , FileEntry} from "@ionic-native/File/ngx";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureAudioOptions
} from "@ionic-native/media-capture/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";

const MEDIA_FOLDER_NAME = "digitalgreenmediafiles";
@Component({
  selector: "app-session-recording-page",
  templateUrl: "./session-recording-page.page.html",
  styleUrls: ["./session-recording-page.page.scss"]
})
export class SessionRecordingPagePage implements OnInit {
  sessionData: object;
  sessionid: string;
  topicName: string;
  recordStarted = false;
  filepath: string;
  storageDirectory: any;
  files = [];
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private sharedDataSevice: SharedDataService,
    private plt: Platform,
    private file: File,
    private mediacapture: MediaCapture,
    private media: Media
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

    this.route.params.subscribe(params => {
      console.log("params", params);
      this.sessionid = params.sessionid;
      const filteredData = this.sharedDataSevice.getSessionById(this.sessionid);
      this.sessionData = filteredData.length > 0 ? filteredData[0] : null;
      this.topicName = params.topicname;
    });
  }
  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(res => {
      this.files = res;
      console.log("files: ", res);
    });
  }
  copyFilesToLocal(fullpath) {
    console.log("full path: ", fullpath);
    let mediapath: string = fullpath;
    if ( mediapath.indexOf("file://") < 0 ) {
      mediapath = "file://" + fullpath;
    }
    const ext = mediapath.split(".").pop();
    const newname = this.sessionid + "_" + this.topicName.split(" ").join("") + "." + ext;
    const oldname = mediapath.substr(mediapath.lastIndexOf("/") + 1 );

    const copyFrom = mediapath.substr(0, mediapath.lastIndexOf("/") + 1 );
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
    this.file.copyFile(copyFrom, oldname, copyTo, newname);
  }
  playAudio(f: FileEntry) {
    if (this.files[0].name.indexOf(".wav") > -1) {
      const path = f.nativeURL.replace(/^file:\/\//, '');
      const audiofile: MediaObject = this.media.create(path);
      audiofile.play();
    }
  }
  stopRecording() {
    // this.file.stopRecord();
    // this.saveRecording(this.filepath);
  }
  startRecording() {
    this.mediacapture.captureAudio({ limit: 3 }).then((data: MediaFile[]) => {
      if ( data) {
       this.copyFilesToLocal(data[0].fullPath);
      }
    }, (err: CaptureError) => {
       console.log("error while start recording", err);
    });
  }
  saveRecording(filename) {
    if (this.recordStarted) {
      this.sharedDataSevice.updateSessionTopicData(
        this.sessionid,
        this.topicName,
        filename
      );
      this.router.navigate(["/sessiondetails", this.sessionid]);
    }
  }
}
