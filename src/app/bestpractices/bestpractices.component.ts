import { Component, Injectable,  ChangeDetectorRef, Input } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { File} from "@ionic-native/file/ngx";
import { Media, MediaObject } from "@ionic-native/media/ngx";
import { Subscription } from 'rxjs';

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
    

    mediaPauseAudio(idx) {
      this.audio.pause();
      this.stop = undefined;
      this.cdr.detectChanges();
    }
    
    mediaPlayAudio(idx ) {
      if(this.plt.is("android"))
  { 

      if(this.stop == 1 || this.stop ==2)
      {
        this.audio.pause();
      }
      if (this.plt.is("android")) {
        this.filepath = this.getSampleAudioPath(idx);
        this.audio = new Audio(this.filepath);
        }
      this.stop = idx;
     
      this.audio.play();
     this.audio.setVolume = 1.0; 
      this.audio.addEventListener("ended",()=>{
        this.mediaPauseAudio(idx);
      })
    
    
         
  }    
     }

    getSampleAudioPath(audioID) {
      //return the file path corresponding to the audio sample  ID provideded 
      return this.audio1Path + `/sample${audioID}.wav`;
     }
  
      ngOnDestroy() {
      if(this.audio) {
        this.audio.pause();
        this.stop =undefined;
        this.audio = null;
      }
    }


    hello()
    {
      console.log("hello world");
    }
}
