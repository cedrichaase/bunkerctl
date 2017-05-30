import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../service/rgb/rgb.service';
import {RgbRealtimeService} from '../../service/rgb-realtime/rgb-realtime.service';

const defaultColor = '#fc0';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  devices: Device[];
  programs: string[];
  dynamic = true;
  private activeProgram: string;

  constructor(private rgb: RgbService, private rgbRealtime: RgbRealtimeService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });

    this.rgbRealtime.getPrograms()
      .subscribe(programs => {
        this.programs = programs;
      });

    this.rgbRealtime.getActiveProgram()
      .subscribe(activeProgram => {
        this.activeProgram = activeProgram;
      });
  }

  switchColor(deviceId: string) {
    const device = this.devices.find(dev => dev.id === deviceId);
    console.log(`color changed: device: ${deviceId}`);
    this.rgb.setColor(deviceId, device.color);
  }

  changeProgram(newProgram) {
    this.rgbRealtime.setActiveProgram(newProgram)
      .subscribe(program => {
        console.log(`set program to ${program}`);
      });
  }

  toggleDynamic() {
    this.dynamic = !this.dynamic;

    if (!this.dynamic) {
      this.changeProgram('');
    } else {
      this.changeProgram(this.activeProgram);
    }
  }
}
