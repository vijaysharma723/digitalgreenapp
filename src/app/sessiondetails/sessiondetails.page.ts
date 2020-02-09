<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from './../services/session/session.service';
=======
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedDataService } from "../shared-data.service";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";
>>>>>>> recordingfeature

@Component({
  selector: "app-sessiondetails",
  templateUrl: "./sessiondetails.page.html",
  styleUrls: ["./sessiondetails.page.scss"]
})
export class SessiondetailsPage implements OnInit {
<<<<<<< HEAD
  sessionData;
  constructor(private route: ActivatedRoute, private sessionService: SessionService) {
   }

  async ngOnInit() {
    await this.route.params.subscribe(async (params)=>{
      let sessionid = params['sessionid'];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
    });  
=======
  sessdata;
  filepath: any;
  audio: any;
  constructor(
    private route: ActivatedRoute,
    private file: File,
    private sharedDataSevice: SharedDataService,
    private media: Media,
    private plt: Platform
  ) {
    this.sessdata = this.sharedDataSevice.getSharedData();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("params", params);
      let sessionid = params["sessionid"];
      const filteredData = this.sharedDataSevice.getSessionById(sessionid);
      this.sessdata = filteredData.length > 0 ? filteredData[0] : null;
      console.log("Session Data : ", this.sessdata);
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
>>>>>>> recordingfeature
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

<<<<<<< HEAD
// UploadTopicFile(topicName) {
//   this.sharedDataSevice.uploadTopicDataToCloud(this.sessdata.sessionid, topicName);
// }
=======
  UploadTopicFile(topicName) {
    this.sharedDataSevice.uploadTopicDataToCloud(
      this.sessdata.sessionid,
      topicName
    );
  }
>>>>>>> recordingfeature
}
