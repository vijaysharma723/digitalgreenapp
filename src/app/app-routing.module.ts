import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "sessions", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "sessions",
    loadChildren: () =>
      import("./sessions/sessions.module").then(m => m.SessionsPageModule)
  },
  {
    path: "sessiondetails/:sessionid",
    loadChildren: () =>
      import("./sessiondetails/sessiondetails.module").then(
        m => m.SessiondetailsPageModule
      )
  },
  {
    path: "createsessions",
    loadChildren: () =>
      import("./createsessions/createsessions.module").then(
        m => m.CreatesessionsPageModule
      )
  },
  {
    path: "sessionrecordingpage/:sessionid/:topic_id",
    loadChildren: () =>
      import("./session-recording-page/session-recording-page.module").then(
        m => m.SessionRecordingPagePageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
