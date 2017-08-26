import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StaticLightComponent} from './view/light/static/static-light.component';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {DynamicLightComponent} from './view/light/dynamic/dynamic-light.component';
import {LightComponent} from './view/light/light.component';
import {TradfriComponent} from './view/light/tradfri/tradfri.component';

const routes: Routes = [
  { path: '', redirectTo: '/light/static', pathMatch: 'full' },
  {
    path: 'light',
    component: LightComponent,
    children: [
      {
        path: 'static',
        component: StaticLightComponent
      },
      {
        path: 'dynamic',
        component: DynamicLightComponent
      },
      {
        path: 'tradfri',
        component: TradfriComponent
      }
    ]
  },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
