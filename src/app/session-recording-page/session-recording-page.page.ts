import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from './../services/session/session.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-session-recording-page',
  templateUrl: './session-recording-page.page.html',
  styleUrls: ['./session-recording-page.page.scss'],
})
export class SessionRecordingPagePage implements OnInit {

sessionData: object;
sessionid: string;
topicName: string;
recordStarted : boolean = false;
  constructor(public router: Router, private route: ActivatedRoute, private sessionService: SessionService) { }

  async ngOnInit() {
    await this.route.params.subscribe(async (params)=>{
      this.sessionid = params['sessionid'];
      this.topicName = params['topicname'];
      this.sessionData = await this.sessionService.getSessionById(this.sessionid);
    })
  }

  async saveRecording() {
    if(this.recordStarted) {
    this.sessionService.updateSessionTopicData(this.sessionid, this.topicName, "filename");
    this.router.navigate(['/sessiondetails', this.sessionid]);
  }

  }

  startRecording() {
    this.recordStarted = true;
  }
}
