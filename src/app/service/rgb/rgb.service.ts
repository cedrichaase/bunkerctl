import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';

export interface Device {
  id: string;
  description: string;
  color: string;
  controls?: Device[];
}

export interface ColorData {
  color: string;
  device: string;
}


@Injectable()
export class RgbService {
  private url = environment.endpoints.rgb;
  private socket;

  constructor(private http: Http) {
    this.socket = io(this.url);
  }


  public colorBroadcast(): Observable<ColorData> {
    return new Observable(observer => {
      this.socket.on('color', data => {
        observer.next(data);
      });
    });
  }



  /**
   * @returns {Observable<string[]>}
   */
  public getDevices(): Observable<Device[]> {
    const url = `${this.url}/devices`;

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends the given color to a device
   *
   * @param deviceId
   * @param color
   */
  public setColor(deviceId: string, color: string): void {
    const data = {
      device: deviceId,
      color: color.replace('#', '')
    };

    this.socket.emit('set-color', data);
  }

  public getColor(deviceId: string): Observable<string> {
    const url = `${this.url}/color/${deviceId}`;

    return this.http.get(url)
      .map((res: Response) => res.text())
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
