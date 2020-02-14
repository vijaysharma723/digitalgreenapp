import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  sessionRoute() {
    this.router.navigate(["/sessions"]);
  }

  newSessionRoute() {
    this.router.navigate(["/createsessions"]);
  }
}
