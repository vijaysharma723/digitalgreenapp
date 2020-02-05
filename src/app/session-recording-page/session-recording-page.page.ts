import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedDataService} from '../shared-data.service';
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
  constructor(public router: Router, private route: ActivatedRoute, private sharedDataSevice: SharedDataService) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      console.log("params",params);      
      this.sessionid = params['sessionid'];
      const filteredData = this.sharedDataSevice.getSessionById(this.sessionid);
      this.sessionData = (filteredData.length>0) ? filteredData[0] : null;
       this.topicName = params['topicname'];
    })
  }

  saveRecording() {
    if(this.recordStarted) {
    this.sharedDataSevice.updateSessionTopicData(this.sessionid, this.topicName, "filename");
    this.router.navigate(['/sessiondetails', this.sessionid]);
  }

  }

  startRecording() {
    this.recordStarted = true;
  }
}
