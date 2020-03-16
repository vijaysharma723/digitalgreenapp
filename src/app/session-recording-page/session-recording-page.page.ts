
import { ToasterService } from "./../services/toaster/toaster.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
import {AlertController} from '@ionic/angular';

import { File, FileEntry } from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
import { ISession } from "../interfaces/ISession";
import { UserService } from "../services/user.service";
import { SyncService } from "../services/sync/sync.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';

const MEDIA_FOLDER_NAME = "digitalgreenmediafiles";
const parentDirFolder = "session";
@Component({
  selector: "app-session-recording-page",
  templateUrl: "./session-recording-page.page.html",
  styleUrls: ["./session-recording-page.page.scss"]
})
export class SessionRecordingPagePage implements OnInit, OnDestroy {
  textnode: string;
  min: number;
  sec: number;
  current = 0;
  target = 300000;
  countFlag = 0;
  sessionData: ISession = {
    sessionid: "",
    name: "",
    created: "",
    isUploaded: false,
    topics: []
  };
  sessionid: string;
  flag: boolean = false;
  topicName: string;
  recordStarted = false;
  filepath: string;
  storageDirectory: any;
  files = [];
  fileName: string;
  audio: MediaObject;
  recordingTimeout: any;
  audioList = [];
  sessionname: any;
  topicObject: object;
  topicid: any;
  mediaParentFolder = "session";
  translateChangeSub: Subscription;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private plt: Platform,
    private file: File,
    private media: Media,
    private sessionService: SessionService,
    private readonly userSrvc: UserService,
    private readonly syncSrvc: SyncService,
    public translate: TranslateService,
    private toaster: ToasterService,
    private readonly alertController: AlertController,
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
      this.topicid = params["topic_id"];
      this.sessionData = await this.sessionService.getSessionById(
        this.sessionid
      );
      this.topicObject = this.sessionData['topics'].find(element => this.topicid === element['topic_id']);
      this.topicName = this.topicObject["topic_name"][this.translate.currentLang];
    });
    // subscribe to detect language change
    this.translateChangeSub = this.translate.onLangChange.subscribe(changeEvent => {
      this.topicName = this.topicObject['topic_name'][changeEvent.lang];
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
  stopMediaRecording() {
    if (this.flag) {
      window.clearInterval(this.recordingTimeout);
      // alert("stopping");
      this.flag = false;
      this.recordStarted = false;
      // IIFE to invoke this immediately
      ( () => {
        window.setTimeout(async () => {
          this.audio.stopRecord();
          this.audio.release();
          const updateddata = await this.sessionService.updateSessionTopicData(
            this.sessionid,
            this.topicid,
            this.fileName
          );
          // trigger the sync api to send the files to the server
          this.userSrvc.getLoggedInUser().then(user => {
            const filePathFromRoot = `${this.mediaParentFolder}/${user.username}_${this.sessionid}_${this.topicid}.wav`;
            // set the status to initiate in local db
            // send the file for upload
            this.syncSrvc.sendSessionFileUploadRequest(filePathFromRoot);
            this.toaster.present({
              text: this.translate.instant('recordingSuccessful'),
              colour: "light"
            });
            this.router.navigate(["/sessiondetails", this.sessionid]);
          });
        }, 1000);
      }
      )();
    } else {
      console.log('recording not yet started, cannot stop before starting');
    }
  }
  mediaPlayAudio(file, idx) {
    // alert("media playing");
    if (this.plt.is("ios")) {
      this.filepath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filepath);
    } else if (this.plt.is("android")) {
      this.filepath = this.file.externalDataDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filepath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }
  startMediaRecording() {
    this.flag = true;
    this.countFlag++;
    if (this.countFlag === 1) {
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
                this.countDown();
                this.recordingTimeout = window.setTimeout(
                  () => this.stopMediaRecording(),
                  300000
                );
              })
              .catch(() => {
                console.log("ABORT");
              });
          }
        }
      });
    } else {
      console.log('flagCount is ', this.countFlag + 'not equal to one');
    }
  }
  countDown() {
    this.current += 1000;
    const diff = this.target - this.current;
    this.min = Math.floor(diff / 1000 / 60);
    this.sec = (diff / 1000) % 60;
    if (diff > 0) {
      setTimeout(() => {
        this.countDown();
      }, 1000);
    }
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
    this.translateChangeSub.unsubscribe();
    if (!!this.audio) {
      window.clearInterval(this.recordingTimeout);
      this.flag = false;
      this.audio.stop();
      this.audio.release();
      this.countFlag = 0;
    }
  }

  ionViewWillLeave() {
    this.translateChangeSub.unsubscribe();
    if (!!this.audio) {
      window.clearInterval(this.recordingTimeout);
      this.flag = false;
      this.audio.stop();
      this.audio.release();
      this.countFlag = 0;
    }
  }


  triggerPrompt(){
    if (this.recordStarted && this.flag) {
      console.log('active recording');
      this.promptForBack();
    } else {
      this.router.navigate(['sessiondetails', this.sessionid]);
    }
  }


  async promptForBack() {
    const alert = await this.alertController.create({
      header: this.translate.instant('Go Back'),
      message: this.translate.instant('Are you sure you want to go back without saving your recording') + '?',
      buttons: [
        {
          text: this.translate.instant('No'),
          handler: () => {
            console.log('clicked no');
          }
        },
        {
          text: this.translate.instant('Yes'),
          handler: () => {
            console.log('clicked OK');
            // route back to sessiondetails route
            this.router.navigate(['sessiondetails', this.sessionid]);
          }
        }
      ]
    });
    await alert.present();
  }
}
