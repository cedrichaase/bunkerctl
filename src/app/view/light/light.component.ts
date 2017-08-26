import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../service/rgb/rgb.service';
import {RgbRealtimeService} from '../../service/rgb-realtime/rgb-realtime.service';
import {TradfriService} from '../../service/tradfri/tradfri.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  devices: Device[];

  constructor(private rgb: RgbService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });

    this.rgb.colorBroadcast().subscribe(data => {
      const device = this.devices.find(dev => dev.id === data.device);
      device.color = `#${data.color}`;
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
}
