import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { BestpracticesComponent } from './bestpractices.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BestPracticesRoutingModule } from './bestpractices-routing.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestPracticesRoutingModule,
    TranslateModule.forChild({
      loader: { 
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      }
    }),
    HttpClientModule,
    SharedModule
  ],
  declarations: [BestpracticesComponent]
  
})
export class BestpracticesModule { }
