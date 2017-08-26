import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../../service/rgb/rgb.service';
import {RgbRealtimeService} from '../../../service/rgb-realtime/rgb-realtime.service';
import 'brace';
import 'brace/mode/python';
import {TradfriService} from '../../../service/tradfri/tradfri.service';
import {environment} from '../../../../environments/environment';
declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'app-light-static',
  templateUrl: './static-light.component.html',
  styleUrls: ['./static-light.component.css']
})
export class StaticLightComponent implements OnInit {
  devices: Device[];
  programs: string[];
  dynamic = false;
  env = environment;
  private activeProgram: string;
  private code: string;

  constructor(private rgb: RgbService, private rgbRealtime: RgbRealtimeService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
        console.log(devices);
      });

    this.rgb.colorBroadcast().subscribe(data => {
      const device = this.findDevice(data.device);

      const color = `#${data.color}`;
      device.color = color;

      if (device.controls) {
        device.controls.forEach(control => {
          control.color = color;
        });
      }
    });

    this.rgbRealtime.getPrograms()
      .subscribe(programs => {
        this.programs = programs;
      });

    this.rgbRealtime.getActiveProgram()
      .subscribe(activeProgram => {
        if (activeProgram) {
          this.activeProgram = activeProgram;
          this.rgbRealtime.getProgram(activeProgram)
            .subscribe(activeProgramInfo => {
              this.code = activeProgramInfo.content;
            });
        }
      });
  }

  private findDevice(id: string): Device {
    const device = this.devices.find(dev => dev.id === id);

    if (device) { return device; }

    for (const d of this.devices) {
      const control = d.controls.find(c => c.id === id);
      if (control) { return control; }
    }

    throw new Error(`No device found for id ${id}`);
  }

  switchColor(deviceId: string) {
    const device = this.findDevice(deviceId);

    if (!device.controls) {
      const parent = this.findDevice(device.id.split('.')[0]);
      parent.color = '#000';
    }

    console.log(`color changed: device: ${deviceId}`);
    this.rgb.setColor(deviceId, device.color);
  }

  broadcastColor(color) {
    this.devices.forEach(d => {
      d.color = color;
      this.rgb.setColor(d.id, color);
    });
  }

  allOn() { this.broadcastColor('#ff8a14'); }

  allOff() { this.broadcastColor('#000');  }

  changeProgram(newProgram) {
    this.rgbRealtime.setActiveProgram(newProgram)
      .subscribe(program => {
        console.log(`set program to ${program}`);
      });

    if (newProgram) {
      console.log('changeProgram', newProgram);
      this.rgbRealtime.getProgram(newProgram)
        .subscribe(info => {
          console.log(info);
          this.code = info.content;
        });
    }
  }

  saveProgram() {
    this.rgbRealtime.saveProgram(this.activeProgram, this.code)
      .subscribe(info => {
        console.log('saved program', info);
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
