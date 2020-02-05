import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  constructor(){

  }
sessionlist=[{name:"Water Harvesting",timestamp:"Mon Feb 03 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Population control",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Air control",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Crop pesti",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Noise control",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Rice meal control",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Control",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
{name:"Weather Understanding",timestamp:"Mon Feb 01 2020 19:01:11 GMT+0530 (India Standard Time)"},
]

  ngOnInit() {

  }
  navigateToDetail(){

  }

      openMenu() {
      document.querySelector('ion-menu-controller')
        .open();
    }
}
