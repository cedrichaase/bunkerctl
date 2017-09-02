import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StaticLightComponent} from './view/light/static/static-light.component';
import {DynamicLightComponent} from './view/light/dynamic/dynamic-light.component';
import {TradfriComponent} from './view/light/tradfri/tradfri.component';
import {PiweatherComponent} from './view/piweather/piweather.component';

const routes: Routes = [
  { path: '', redirectTo: '/light/static', pathMatch: 'full' },
  {
    path: 'light',
    children: [
      {
        path: '',
        redirectTo: 'static',
        pathMatch: 'full'
      },
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
  { path: 'piweather', component: PiweatherComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
