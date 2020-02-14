import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './component/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePipe } from './pipes/datetime/date-time.pipe';



@NgModule({
  declarations: [DateTimePipe, FooterComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  exports: [
    DateTimePipe,
    FooterComponent
  ]
})
export class SharedModule { }
