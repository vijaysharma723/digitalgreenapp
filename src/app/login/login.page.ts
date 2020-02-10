import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { ToasterService } from './../services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

username: string;
password: string;
// login = {};
  constructor(private userService: UserService, private router: Router, private toaster: ToasterService) { }

  ngOnInit() {
  }

async userLogin() {
  if(!this.username) {
    this.toaster.present({text: "Please enter Username.", colour: "danger"});
  } else if(!this.password) {
    this.toaster.present({text: "Please enter Password.", colour: "danger"});
  } else {
  const status = await this.userService.validateUserDetails(this.username, this.password);
  if(status === 1) {
    this.toaster.present({text: "Logged in Successfully.", colour: "light"});
    this.username = "";
    this.password = "";
    this.router.navigate(["/sessions"]);
  } else if(status === 0) {
    this.toaster.present({text: "Please enter correct Password.", colour: "danger"});
    this.password = "";
  } else if(status === -10) {
    this.toaster.present({text: "Unable to Login.", colour: "danger"});
    this.password = "";
  } else {
    this.toaster.present({text: "Please enter correct Username and Password.", colour: "danger"});
    this.username = "";
    this.password = "";
  }
  }
}
}
