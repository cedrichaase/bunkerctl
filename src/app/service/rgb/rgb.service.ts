import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class RgbService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public setColor(color: string): void {
    this.socket.emit('set-color', color.replace('#', ''));
  }
}
