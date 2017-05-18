import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LightComponent } from './view/light/light.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'angular2-color-picker';
import {RgbService} from './service/rgb/rgb.service';
import { PiweatherComponent } from './view/piweather/piweather.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LightComponent,
    PiweatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ColorPickerModule
  ],
  providers: [
    RgbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
