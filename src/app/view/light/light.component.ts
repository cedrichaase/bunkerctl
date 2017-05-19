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
  code = `
    setColor("bett", "fc0");
    wait(1000);
    setColor("bett", "0cf");
    wait(1000);
  `;
  codeLoop;
  isAmbilightActive = false;
  loadCoadeClicked: boolean;

  constructor(private rgb: RgbService) { }

  ngOnInit(): void {
    this.rgb.getDevices()
      .subscribe(devices => {
        this.devices = devices;
      });
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

  executeCode() {
    if (!!this.codeLoop) {
      clearInterval(this.codeLoop);
    }

    const setColor = (color) => this.rgb.setColor('bett', color);
    eval(this.code);
  }

  loadCode() {
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

    this.loadCoadeClicked = false;
    async.whilst(
      () => !this.loadCoadeClicked,
      (callback) => {
        async.series(tasks, (error, results) => {
          callback(null);
        });
      },
      (error) => { /* nop */ }
    );
  }

  private onAmbilightChanged() {
    const isActive = this.isAmbilightActive;
    console.log(`Ambilight is active: ${isActive}`);

    // TODO
  }
}
