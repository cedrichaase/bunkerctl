import { Component, OnInit } from '@angular/core';
import {TradfriService} from '../../../service/tradfri/tradfri.service';

@Component({
  selector: 'app-tradfri',
  templateUrl: './tradfri.component.html',
  styleUrls: ['./tradfri.component.css']
})
export class TradfriComponent implements OnInit {

  constructor(private tradfri: TradfriService) { }

  ngOnInit() {
  }

  toggleLights() {
    this.tradfri.toggle();
  }

  switchHue() {
    this.tradfri.hue();
  }

  incBrightness() {
    this.tradfri.incBrightness();
  }

  decBrightness() {
    this.tradfri.decBrightness();
  }
}
