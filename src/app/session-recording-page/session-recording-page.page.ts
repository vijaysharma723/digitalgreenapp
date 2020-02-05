import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-session-recording-page',
  templateUrl: './session-recording-page.page.html',
  styleUrls: ['./session-recording-page.page.scss'],
})
export class SessionRecordingPagePage implements OnInit {

sessioncategory: string;
sectiontitle: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      console.log("params",params);
      this.sessioncategory = params['sectionid'];
       this.sectiontitle = params['sectionname'];
    })
  }

}
