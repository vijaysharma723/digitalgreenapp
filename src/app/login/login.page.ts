import { Component, OnInit } from '@angular/core';
import {UserService} from './../services/user.service';
import {Router} from '@angular/router';
import {ToasterService} from './../services/toaster/toaster.service';

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

// submit() {
//   console.log();
// }
async userLogin() {
  if(!this.username) {
    this.toaster.present({text:"Please enter Username.", colour:"danger"});
    // console.log("Please enter Username");
  }
  else if(!this.password) {
    this.toaster.present({text:"Please enter Password.", colour:"danger"});
    // console.log("Please enter Password");
  }
  else {
  const status = await this.userService.validateUserDetails(this.username, this.password);
  console.log(status);
  if(status === 1) {
    this.toaster.present({text:"Logged in Successfully.", colour:"primary"});
    console.log("User validated");
    this.username = "";
    this.password = "";
    this.router.navigate(['/sessions']);
  }
  else if(status === 0) {
    this.toaster.present({text:"Please enter correct Password.", colour:"danger"});
    // console.log("User Password incorrect");
    this.password = "";
  }
  else {
    this.toaster.present({text:"Please enter correct Username and Password.", colour:"danger"});
    // console.log("Username and password incorrect");
    this.username = "";
    this.password = "";
  }
  }
}
}
