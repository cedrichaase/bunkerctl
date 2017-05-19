import { Component, OnInit } from '@angular/core';
import {Device, RgbService} from '../../service/rgb/rgb.service';

const defaultColor = '#fc0';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  devices: Device[];
  code = 'setColor("f00"); setTimeout\(\(\) \=\> \{setColor\("0f0"\);\}, 500)\;';
  language = 'javascript';
  codeLoop;

  isAmbilightActive = false;

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

  private onAmbilightChanged() {
    const isActive = this.isAmbilightActive;
    console.log(`Ambilight is active: ${isActive}`);

    // TODO
  }
}
