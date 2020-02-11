import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SessionService } from "./../services/session/session.service";

import { Router } from "@angular/router";
import { File, FileEntry } from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import { ISession } from "../interfaces/ISession";
import { UserService } from "../services/user.service";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { SyncService } from "../services/sync/sync.service";

const MEDIA_FOLDER_NAME = "digitalgreenmediafiles";
const parentDirFolder = "session";
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
  mediaParentFolder = "session";
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private plt: Platform,
    private file: File,
    private media: Media,
    private sessionService: SessionService,
    private readonly userSrvc: UserService,
    private readonly syncSrvc: SyncService
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
    const updateddata = await this.sessionService.updateSessionTopicData(
      this.sessionid,
      this.topicid,
      this.fileName
    );
    // trigger the sync api to send the files to the server
    this.userSrvc.getLoggedInUser().then(user => {
      const filePathFromRoot = `${this.mediaParentFolder}/${user.username}_${this.sessionid}_${this.topicid}.wav`;
      this.syncSrvc.sendSessionFileUploadRequest(filePathFromRoot);
      this.router.navigate(["/sessiondetails", this.sessionid]);
    });
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
    // get the username, session id and topic id to create a filename of convention username_sessionID_topicID.wav
    this.userSrvc.getLoggedInUser().then(user => {
      if (user) {
        console.log(user);
        console.log("session data is ", this.sessionData);
        this.fileName = `${user.username}_${this.sessionid}_${this.topicid}.wav`;
        console.log("filename is ", this.fileName);
        // create media file as per platform
        if (this.plt.is("ios")) {
          this.filepath =
            this.file.documentsDirectory.replace(/file:\/\//g, "") +
            this.fileName;
        } else if (this.plt.is("android")) {
          console.log("android device");
          this.filepath =
            this.file.externalDataDirectory.replace(/file:\/\//g, "") +
            parentDirFolder +
            "/" +
            this.fileName;
          this.checkAndCreateSessionDir()
            .then(created => {
              console.log("saving recording as ", this.fileName);
              console.log("savnig in ", this.filepath);
              this.audio = this.media.create(this.filepath);
              this.recordStarted = true;
              this.audio.startRecord();
            })
            .catch(() => {
              console.log("ABORt");
            });
        }
      }
    });
  }

  checkAndCreateSessionDir() {
    return new Promise((res, rej) => {
      this.file
        .checkDir(this.file.externalDataDirectory, parentDirFolder)
        .then(exists => {
          console.log("exist res ", exists);
          res(true);
        })
        .catch(doesnotExist => {
          // creating sessions dir
          console.log("does not exist error ", doesnotExist);
          console.log("creating sessions directory");
          this.file
            .createDir(this.file.externalDataDirectory, parentDirFolder, true)
            .then(created => {
              console.log("created ", created);
              res(true);
            })
            .catch(creationErr => {
              console.log("Error while creating sessions dir", creationErr);
              rej();
            });
        });
    });
  }
  ngOnDestroy() {
    if (!!this.audio) {
      this.audio.stop();
      this.audio.release();
    }
  }
}
