import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginPage } from "./login.page";
import { AuthLoginGuard } from "../guards/auth-login.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginPage,
    canActivate: [AuthLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}
