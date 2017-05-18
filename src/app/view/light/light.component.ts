import { Component, OnInit } from '@angular/core';
import {RgbService} from '../../service/rgb/rgb.service';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  color = {};
  selectedColor = {};
  devices: string[];

  constructor(private rgb: RgbService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;

        for (const device of devices) {
          this.color[device] = '#fc0';
          this.selectedColor[device] = '#fc0';
        }
      });
  }

  switchColor(device: string) {
    console.log('color changed');
    this.color[device] = this.selectedColor[device];
    this.rgb.setColor(device, this.color[device]);
  }
}
