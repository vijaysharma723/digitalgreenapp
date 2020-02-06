import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedDataService } from "../shared-data.service";
import { Router } from "@angular/router";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Storage } from "@ionic/storage";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureAudioOptions
} from "@ionic-native/media-capture/ngx";
import { Platform } from "@ionic/angular";

const MEDIA_STORAGE_KEY = "mediafiles";
@Component({
  selector: "app-session-recording-page",
  templateUrl: "./session-recording-page.page.html",
  styleUrls: ["./session-recording-page.page.scss"]
})
export class SessionRecordingPagePage implements OnInit {
  sessionData: object;
  sessionid: string;
  topicName: string;
  recordStarted: boolean = false;
  file: MediaObject;
  filepath: string;
  storageDirectory: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private sharedDataSevice: SharedDataService,
    private media: Media,
    private platform: Platform,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("params", params);
      this.sessionid = params["sessionid"];
      const filteredData = this.sharedDataSevice.getSessionById(this.sessionid);
      this.sessionData = filteredData.length > 0 ? filteredData[0] : null;
      this.topicName = params["topicname"];
    });
  }
  stopRecording() {
    this.file.stopRecord();
    this.saveRecording(this.filepath);
  }
  startRecording(
    data = {
      username: "deepak",
      sessionid: "1580986703204",
      topicname: "improvement"
    }
  ) {
    debugger;
    this.recordStarted = true;
    let key = data.username + "_" + data.sessionid + "_" + data.topicname;
    this.filepath =
      data.username + "_" + data.sessionid + "_" + data.topicname + ".m4a";
    console.log("driver: ", this.storage.driver);
    // set a key/value

    this.storage.set(MEDIA_STORAGE_KEY, JSON.stringify(this.filepath));

    // Or to get a key/value pair
    this.storage.get(MEDIA_STORAGE_KEY).then(val => {
      debugger;
      console.log("Your age is", val);
    });
    this.file = this.media.create(this.filepath);
    this.file.startRecord();
    this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

    this.file.onSuccess.subscribe(() => console.log("Action is successful"));

    this.file.onError.subscribe(error => console.log("Error!", error));

    // let options: CaptureAudioOptions = { limit: 3, duration: 180 };
    // this.mediaCapture.captureAudio(options).then(
    //   (data: MediaFile[]) => console.log(data),
    //   (err: CaptureError) => console.error(err)
    // );
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
