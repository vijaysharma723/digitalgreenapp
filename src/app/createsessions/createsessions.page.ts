// tslint:disable: no-string-literal
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../services/session/session.service';
import { ToasterService } from './../services/toaster/toaster.service';
@Component({
  selector: 'app-createsessions',
  templateUrl: './createsessions.page.html',
  styleUrls: ['./createsessions.page.scss']
})
export class CreatesessionsPage implements OnInit {
  @ViewChild('sessionInput', { static: false }) sessionInput;

  sessionDate = new Date();
  topic: string;
  userSessions = [];
  userRole: string;

  constructor(
    public router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private toaster: ToasterService
  ) {}

  async ngOnInit() {
    // setTimeout(() => {
    //   this.sessionInput.setFocus();
    // }, 0);
    this.userRole = await this.userService.getUserRole();
    this.userSessions = await this.userService.getUserTopics();
    if (this.userRole !== 'vrp') {
      this.topic = 'Untitled_' + new Date().getTime().toString();
    }
  }

  async logForm() {
    if (this.topic) {
      const newSession = await this.createNewSession(this.topic);
      const result = await this.sessionService.addNewSession(newSession);
      if (result) {
        this.toaster.present({
          text: 'Session created successfully.',
          colour: 'light'
        });
        this.router.navigate(['/sessiondetails', newSession['sessionid']]);
      } else {
        this.toaster.present({
          text: 'Unable to create Session.',
          colour: 'danger'
        });
      }
    } else {
      this.toaster.present({text: 'Please select Topic.', colour: 'danger'});
    }
  }

  async createNewSession(name) {
    const newSessionDetails = {};
    newSessionDetails['name'] = name;
    newSessionDetails['sessionid'] = await this.sessionService.createUniqueId();
    newSessionDetails['created'] = new Date().toISOString();
    newSessionDetails['isUploaded'] = false;
    const userTopics = await this.userService.getUserQuestions();
    newSessionDetails['topics'] = userTopics;

    return newSessionDetails;
  }
}
