import { Component, OnInit } from '@angular/core';
import {SessionService} from './../services/session/session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(private sessionService: SessionService){

  }
sessionlist = [];

  async ngOnInit() {
    const sessions = await this.sessionService.getSessionList();
    if(!!sessions)
    this.sessionlist = sessions;
  }
}
