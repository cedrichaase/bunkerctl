import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../service/rgb/rgb.service';
import async from 'async';

const defaultColor = '#fc0';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  devices: Device[];

  isAmbilightActive = false;

  code = `setColor("bett", "fc0");
wait(1000);
setColor("bett", "0cf");
wait(1000);`;

  private codeLoop = (next) => { setTimeout(() => { return next(); }, 1000); };

  constructor(private rgb: RgbService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });

    async.forever(
      next => {
        this.codeLoop(next);
      },
      error => {
        console.log('code loop stopped');
      }
    );
  }

  switchColor(deviceId: string) {
    const device = this.devices.find(dev => dev.id === deviceId);
    console.log(`color changed: device: ${deviceId}`);
    this.rgb.setColor(deviceId, device.color);
  }

  toggleAmbilight() {
    this.isAmbilightActive = !this.isAmbilightActive;
    this.onAmbilightChanged();
  }

  loadCode() {
    this.codeLoop = next => {
      let tasks = [];

      const setColor = (id, color) => {
        tasks.push(cb => {
          this.rgb.setColor(id, color);
          cb(null, true);
        });
      };

      const wait = (millis) => {
        tasks.push(cb => {
          setTimeout(() => {
            cb(null, true);
          }, millis);
        });
      };

      eval(this.code);

      async.series(tasks, (error, results) => {
        return next();
      });

    };
  }

  private onAmbilightChanged() {
    const isActive = this.isAmbilightActive;
    console.log(`Ambilight is active: ${isActive}`);

    // TODO
  }
}
