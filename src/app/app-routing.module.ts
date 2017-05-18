import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LightComponent} from './view/light/light.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/light', pathMatch: 'full' },
  { path: 'light', component: LightComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
