import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatesessionsPageRoutingModule } from './createsessions-routing.module';

import { CreatesessionsPage } from './createsessions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatesessionsPageRoutingModule
  ],
  declarations: [CreatesessionsPage]
})
export class CreatesessionsPageModule {}
