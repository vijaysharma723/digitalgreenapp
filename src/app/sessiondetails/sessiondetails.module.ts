import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SessiondetailsPageRoutingModule } from './sessiondetails-routing.module';

import { SessiondetailsPage } from './sessiondetails.page';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SessiondetailsPageRoutingModule
  ],
  declarations: [SessiondetailsPage],
  providers: [File]
})
export class SessiondetailsPageModule {}
