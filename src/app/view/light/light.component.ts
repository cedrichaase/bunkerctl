import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  moduleId: module.id,
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.css']
})
export class LightComponent implements OnInit {
  color = '#fc0';
  selectedColor = '#fc0';

  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  ngOnInit() {
    this.socket = io(this.url);
  }

  switchColor() {
    console.log('color changed');
    this.color = this.selectedColor;
    this.socket.emit('set-color', this.color.replace('#', ''));
  }
}
