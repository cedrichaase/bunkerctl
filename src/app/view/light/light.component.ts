import { Component, OnInit } from '@angular/core';
import {RgbService} from '../../service/rgb/rgb.service';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent {
  color = '#fc0';
  selectedColor = '#fc0';

  constructor(private rgb: RgbService) { }

  switchColor() {
    console.log('color changed');
    this.color = this.selectedColor;
    this.rgb.setColor(this.color);
  }
}
