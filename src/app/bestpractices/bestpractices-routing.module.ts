import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BestpracticesComponent} from './bestpractices.component';

const routes: Routes= [
   {
        path: '',
    component: BestpracticesComponent
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

  export class BestPracticesRoutingModule{}
