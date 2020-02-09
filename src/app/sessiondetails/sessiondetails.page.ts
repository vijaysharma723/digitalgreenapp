import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SharedDataService } from "../shared-data.service";
import { File, FileEntry } from "@ionic-native/File/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-sessiondetails",
  templateUrl: "./sessiondetails.page.html",
  styleUrls: ["./sessiondetails.page.scss"]
})
export class SessiondetailsPage implements OnInit {
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
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  UploadTopicFile(topicName) {
    this.sharedDataSevice.uploadTopicDataToCloud(
      this.sessdata.sessionid,
      topicName
    );
  }
}
