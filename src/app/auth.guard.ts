import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./services/user.service";
import { SessionService } from "./services/session/session.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const loggedInUserDetails = await this.userService.getLoggedInUser();
    console.log("Logged In Users : ", loggedInUserDetails);
    if(!!loggedInUserDetails)
      return Promise.resolve(true);
    else {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }
  }
}
