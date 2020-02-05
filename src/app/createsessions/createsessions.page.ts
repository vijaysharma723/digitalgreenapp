import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createsessions',
  templateUrl: './createsessions.page.html',
  styleUrls: ['./createsessions.page.scss'],
})
export class CreatesessionsPage implements OnInit {
sessionDate=new Date();
name: string;
  constructor(public router: Router) { }

  ngOnInit() {
  }

  logForm() {
    console.log('Name entered : ',this.name);
    if(this.name) {
      this.router.navigate(['/sessiondetails', this.name]);
    } else {
          console.log("Please enter a Name");
    }
  }

}
