import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatesessionsPage } from './createsessions.page';

const routes: Routes = [
  {
    path: '',
    component: CreatesessionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatesessionsPageRoutingModule {}
