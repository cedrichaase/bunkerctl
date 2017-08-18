import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../service/rgb/rgb.service';
import {RgbRealtimeService} from '../../service/rgb-realtime/rgb-realtime.service';
import 'brace';
import 'brace/mode/python';
import {TradfriService} from '../../service/tradfri/tradfri.service';
import {environment} from '../../../environments/environment';


@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  devices: Device[];
  programs: string[];
  dynamic = false;
  env = environment;
  private activeProgram: string;
  private code: string;

  constructor(private rgb: RgbService,  private tradfri: TradfriService, private rgbRealtime: RgbRealtimeService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });

    this.rgb.colorBroadcast().subscribe(data => {
      const device = this.devices.find(dev => dev.id === data.device);
      device.color = `#${data.color}`;
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

  switchColor(deviceId: string) {
    const device = this.devices.find(dev => dev.id === deviceId);
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
