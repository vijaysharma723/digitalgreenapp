import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sessiondetails',
  templateUrl: './sessiondetails.page.html',
  styleUrls: ['./sessiondetails.page.scss'],
})
export class SessiondetailsPage implements OnInit {

sessiontitle: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      console.log("params",params);
      this.sessiontitle = params['sectionname'];
    })
  }

}
