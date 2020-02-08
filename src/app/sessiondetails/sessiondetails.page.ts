import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from './../services/session/session.service';

@Component({
  selector: 'app-sessiondetails',
  templateUrl: './sessiondetails.page.html',
  styleUrls: ['./sessiondetails.page.scss'],
})
export class SessiondetailsPage implements OnInit {
  sessionData;
  constructor(private route: ActivatedRoute, private sessionService: SessionService) {
   }

  async ngOnInit() {
    await this.route.params.subscribe(async (params)=>{
      let sessionid = params['sessionid'];
      this.sessionData = await this.sessionService.getSessionById(sessionid);
    });  
    }

// UploadTopicFile(topicName) {
//   this.sharedDataSevice.uploadTopicDataToCloud(this.sessdata.sessionid, topicName);
// }
}
