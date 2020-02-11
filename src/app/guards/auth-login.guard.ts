import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class AuthLoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const loggedInUserDetails = await this.userService.getLoggedInUser();
    if (!!loggedInUserDetails) {
      return Promise.resolve(false);
    } else {
      return Promise.resolve(true);
    }
  }
}
