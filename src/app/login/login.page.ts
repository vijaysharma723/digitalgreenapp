import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "./../services/user.service";
import { Router } from "@angular/router";
import { ToasterService } from "./../services/toaster/toaster.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {}

  async userLogin() {
    if (!this.username) {
      this.toaster.present({
        text: this.toaster.toasterMessage.noUsername,
        colour: "danger"
      });
    } else if (!this.password) {
      this.toaster.present({
        text: this.toaster.toasterMessage.noPassword,
        colour: "danger"
      });
    } else {
      const status = await this.userService.validateUserDetails(
        this.username,
        this.password
      );
      if (status === 1) {
        this.toaster.present({
          text: this.toaster.toasterMessage.loggedInSuccessfully,
          colour: "light"
        });
        this.username = "";
        this.password = "";
        this.router.navigate(["/sessions"]);
      } else if (status === 0) {
        this.toaster.present({
          text: this.toaster.toasterMessage.incorrectPassword,
          colour: "danger"
        });
        this.password = "";
      } else if (status === -10) {
        this.toaster.present({
          text: this.toaster.toasterMessage.loginFailed,
          colour: "danger"
        });
        this.password = "";
      } else {
        this.toaster.present({
          text: this.toaster.toasterMessage.incorrectUsernamePassword,
          colour: "danger"
        });
        this.username = "";
        this.password = "";
      }
    }
  }
}
