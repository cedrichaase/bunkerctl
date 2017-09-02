import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { StaticLightComponent } from './view/light/static/static-light.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerModule} from 'ngx-color-picker';
import {RgbService} from './service/rgb/rgb.service';
import { PiweatherComponent } from './view/piweather/piweather.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AceEditorDirective, AceEditorComponent, AceEditorModule } from 'ng2-ace-editor';
import 'brace';
import {RgbRealtimeService} from './service/rgb-realtime/rgb-realtime.service';
import {TradfriService} from './service/tradfri/tradfri.service';
import { TradfriComponent } from './view/light/tradfri/tradfri.component';
import { DynamicLightComponent } from './view/light/dynamic/dynamic-light.component';
import {SafePipe} from './pipe/safe.pipe';
import {ArraySortPipe} from './pipe/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PiweatherComponent,
    StaticLightComponent,
    PiweatherComponent,
    TradfriComponent,
    DynamicLightComponent,
    SafePipe,
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ColorPickerModule,
    AceEditorModule,
    NgxChartsModule
  ],
  providers: [
    RgbService,
    RgbRealtimeService,
    TradfriService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
