import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePipe } from './pipes/datetime/date-time.pipe';



@NgModule({
  declarations: [DateTimePipe],
  imports: [
    CommonModule
  ],
  exports: [
    DateTimePipe
  ]
})
export class SharedModule { }
