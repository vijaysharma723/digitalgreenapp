import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SharedDataService} from '../shared-data.service';

@Component({
  selector: 'app-createsessions',
  templateUrl: './createsessions.page.html',
  styleUrls: ['./createsessions.page.scss'],
})
export class CreatesessionsPage implements OnInit {
sessionDate=new Date();
name: string;
  constructor(public router: Router, private sharedDataSevice: SharedDataService) { }

  ngOnInit() {
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
      newSessionDetails['sessionid'] = this.sharedDataSevice.createId();
      newSessionDetails['created'] = new Date();
      newSessionDetails['isUploaded'] = false;
      newSessionDetails['topics'] = 
      [{"topic_name": "Challenges","isUploaded": false},
      {"topic_name": "Expectation","isUploaded": false},
      {"topic_name": "Actions","isUploaded": false}];

      return newSessionDetails;
}
}
