import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedDataService} from '../shared-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sessiondetails',
  templateUrl: './sessiondetails.page.html',
  styleUrls: ['./sessiondetails.page.scss'],
})
export class SessiondetailsPage implements OnInit {
sessdata;
  constructor(private route: ActivatedRoute, private sharedDataSevice: SharedDataService, translate: TranslateService) {
         this.sessdata = this.sharedDataSevice.getSharedData();
         // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    console.log(translate);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('hi');
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
