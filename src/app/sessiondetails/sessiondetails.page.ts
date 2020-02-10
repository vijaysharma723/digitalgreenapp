import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "./../services/session/session.service";
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
  stop: any;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private file: File,
    private media: Media,
    private plt: Platform,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async params => {
      let sessionid = params["sessionid"];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
    });
  }
  mediaRecording(topic, idx) {
    this.stop = idx;

    this.router.navigate([
      "/sessionrecordingpage",
      this.sessionData.sessionid,
      topic.topic_id,
      topic.topic_name
    ]);
  }
  mediaPauseAudio(i) {
    this.audio.pause();
    this.stop = i;
  }
  mediaPlayAudio(file, idx) {
    if (this.plt.is("ios")) {
      this.filepath =
        this.file.documentsDirectory.replace(/file:\/\//g, "") + file;
      this.audio = this.media.create(this.filepath);
    } else if (this.plt.is("android")) {
      this.filepath =
        this.file.externalDataDirectory.replace(/file:\/\//g, "") + file;

      this.audio = this.media.create(this.filepath);
    }
    this.audio.play();
    this.stop = idx;

    this.audio.setVolume(0.8);
  }
  ngOnDestroy() {
    if (!!this.audio) this.audio.stop();
  }
}
