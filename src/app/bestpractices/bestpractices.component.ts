import { Component, Injectable,  ChangeDetectorRef } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { File} from "@ionic-native/file/ngx";
import { Media } from "@ionic-native/media/ngx";
import { Subscription } from 'rxjs';

const SAMPLE_1 = "/Users/vijaysharma/Documents/digitalgreen/digitalgreenapp/digitalgreenapp/src/assets/sampleaudios/sample1.mp3";

@Component({
  selector: 'app-bestpractices',
  templateUrl: './bestpractices.component.html',
  styleUrls: ['./bestpractices.component.scss'],
})

@Injectable({
providedIn:'root'
})

export class BestpracticesComponent {
  filepath: any;
  audio: any;
  stop: any;
  audio1Path = './../../assets/sampleaudios'
  translateChangeSub: Subscription;
  constructor(
    private readonly translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private plt: Platform,
    private file: File,
    private media: Media,
    
    ){}



    mediaPauseAudio(topic, i) {
      this.audio.pause();
      this.stop = undefined;
      this.cdr.detectChanges();
    }
    mediaPlayAudio(idx) {
      if (this.plt.is("android")) {
        this.filepath = this.getSampleAudioPath(idx);
        this.audio = this.media.create(this.filepath);
      }
      this.audio.play();
      this.stop = idx;
      this.cdr.detectChanges();
      console.log('audio',this.audio.play());
      this.audio.setVolume(1.0);
      this.audio.onStatusUpdate.subscribe(status => {
        console.log('status',status);
        if (status.toString() === "4") {
          // player end running
          this.stop = undefined;
          this.cdr.detectChanges();
           }
      });
    }

    getSampleAudioPath(audioID) {
      //return the file path corresponding to the audio sample  ID provideded 
      return this.audio1Path + `/sample${audioID}.mp3`;
     }
  
    ngOnDestroy() {
      if (!!this.audio) {
        this.audio.stop();
      }
      this.translateChangeSub.unsubscribe();
    }
 
}
