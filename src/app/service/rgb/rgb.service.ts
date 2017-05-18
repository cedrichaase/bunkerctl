import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RgbService {
  private url = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) {
    this.socket = io(this.url);
  }


  /**
   * @returns {Observable<string[]>}
   */
  public getDevices(): Observable<string[]> {
    const url = `${this.url}/devices`;

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends the given color to a device
   *
   * @param device
   * @param color
   */
  public setColor(device: string, color: string): void {
    const data = {
      device: device,
      color: color.replace('#', '')
    };

    this.socket.emit('set-color', data);
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
