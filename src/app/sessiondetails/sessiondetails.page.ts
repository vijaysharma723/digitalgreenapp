import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedDataService} from '../shared-data.service';

@Component({
  selector: 'app-sessiondetails',
  templateUrl: './sessiondetails.page.html',
  styleUrls: ['./sessiondetails.page.scss'],
})
export class SessiondetailsPage implements OnInit {
sessdata;
  constructor(private route: ActivatedRoute, private sharedDataSevice: SharedDataService) {
         this.sessdata = this.sharedDataSevice.getSharedData();
   }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      console.log("params",params);
      let sessionid = params['sessionid'];
      const filteredData = this.sharedDataSevice.getSessionById(sessionid);
      this.sessdata = (filteredData.length>0) ? filteredData[0] : null;
      console.log('Session Data : ',this.sessdata);
    });  
    }

UploadTopicFile(topicName) {
  this.sharedDataSevice.uploadTopicDataToCloud(this.sessdata.sessionid, topicName);
}
}
