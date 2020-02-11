import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionRecordingPagePageRoutingModule } from './session-recording-page-routing.module';

import { SessionRecordingPagePage } from './session-recording-page.page';
import {File} from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionRecordingPagePageRoutingModule
  ],
  declarations: [SessionRecordingPagePage],
  providers: [File]
})
export class SessionRecordingPagePageModule {}
