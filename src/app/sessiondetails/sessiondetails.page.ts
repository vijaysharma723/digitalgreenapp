import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  playedicon = true;
  stoppedicon = false;
  stop: any;
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private file: File,
    private media: Media,
    private plt: Platform
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async params => {
      let sessionid = params["sessionid"];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
    });
  }
  mediaPauseAudio(i) {
    this.audio.pause();
    this.stop = i;
    this.playedicon = true;
    this.stoppedicon = false;
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
    this.stoppedicon = true;
    this.playedicon = false;

    this.audio.setVolume(0.8);
  }
  ngOnDestroy() {
    if (!!this.audio) this.audio.stop();
  }
}
