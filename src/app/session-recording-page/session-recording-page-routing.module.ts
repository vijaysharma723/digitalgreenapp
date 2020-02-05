import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionRecordingPagePage } from './session-recording-page.page';

const routes: Routes = [
  {
    path: '',
    component: SessionRecordingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SessionRecordingPagePageRoutingModule {}
