import { Component, OnInit } from '@angular/core';
import {UserService} from './../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

username: string;
password: string;
// login = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

// submit() {
//   console.log();
// }
userLogin() {
  if(!this.username) {
    console.log("Please enter Username");
  }
  else if(!this.password) {
    console.log("Please enter Password");
  }
  else {
  const status = this.userService.validateUserDetails(this.username, this.password);
  if(status === 1) {
    this.userService.createSession();
    console.log("User validated");
    this.username = "";
    this.password = "";
    this.router.navigate(['/sessions']);
  }
  else if(status === 0) {
    console.log("User Password incorrect");
    this.password = "";
  }
  else {
        console.log("Username and password incorrect");
    this.username = "";
    this.password = "";
  }
  }
}
}
