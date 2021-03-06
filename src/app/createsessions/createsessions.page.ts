import { Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SharedDataService} from '../shared-data.service';

@Component({
  selector: 'app-createsessions',
  templateUrl: './createsessions.page.html',
  styleUrls: ['./createsessions.page.scss'],
})
export class CreatesessionsPage implements OnInit {

  @ViewChild('sessionInput',{static: false}) sessionInput

sessionDate=new Date();
name: string = "farming_" + new Date().getTime();
  constructor(public router: Router, private sharedDataSevice: SharedDataService) { }
  ngOnInit() {
    setTimeout(() => {
      this.sessionInput.setFocus();
    },0);  
    }

  logForm() {
    console.log('Name entered : ',this.name);
    if(this.name) {

      const newSession = this.createNewSession(this.name);
      this.sharedDataSevice.addNewSession(newSession);

      // console.log(this.sharedDataSevice.getSessionList());

      this.router.navigate(['/sessiondetails', newSession['sessionid']]);
    } else {
          console.log("Please enter a Name");
    }
  }

createNewSession(name) {
        const newSessionDetails = {};
      newSessionDetails['name'] = name;
      newSessionDetails['sessionid'] = this.sharedDataSevice.createUniqueId();
      newSessionDetails['created'] = new Date();
      newSessionDetails['isUploaded'] = false;
      newSessionDetails['topics'] = 
      [{"topic_name": "What needs to be improved in the video.","isUploaded": false},
      {"topic_name": "What do you want to learn more.","isUploaded": false},
      {"topic_name": "What are the challenges in general.","isUploaded": false}];

      return newSessionDetails;
}
}
