import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './component/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePipe } from './pipes/datetime/date-time.pipe';
import { TranslatorComponent } from './translator/translator.component';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [DateTimePipe, FooterComponent, TranslatorComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    FormsModule
  ],
  exports: [
    DateTimePipe,
    FooterComponent,
    TranslatorComponent
  ]
})
export class SharedModule { }
