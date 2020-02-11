import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessionsPageRoutingModule } from './sessions-routing.module';

import { SessionsPage } from './sessions.page';
import {File} from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessionsPageRoutingModule
  ],
  providers: [File],
  declarations: [SessionsPage]
})
export class SessionsPageModule {}
