import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../../environments/environment';

export interface IProgramInfo {
  name: string;
  content: string;
}

@Injectable()
export class RgbRealtimeService {
  private url = environment.endpoints.rgbRealtime;

  private url_mgmt = `${this.url}/mgmt`;
  private url_ctrl = `${this.url}/ctrl`;

  constructor(private http: Http) { }

  public getPrograms(): Observable<string[]> {
    const url = `${this.url_mgmt}/programs`;

    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public setActiveProgram(name: string): Observable<string> {
    const url = `${this.url_ctrl}/program/${name}`;

    return this.http.put(url, '')
      .map(this.extractData);
  }

  public stopActiveProgram(): Observable<undefined> {
    const url = `${this.url_ctrl}/program/`;

    return this.http.put(url, '')
      .map(this.extractData);
  }

  public getActiveProgram(): Observable<string> {
    const url = `${this.url_ctrl}/program`;

    return this.http.get(url)
      .map(this.extractData);
  }

  public getProgram(name: string): Observable<IProgramInfo> {
    const url = `${this.url_mgmt}/program/${name}`;

    return this.http.get(url)
      .map(this.extractData);
  }

  public saveProgram(name: string, programInfo: IProgramInfo): Observable<IProgramInfo> {
    const url = `${this.url_mgmt}/program/${name}`;

    return this.http.put(url, programInfo)
      .map(this.extractData);
  }

  public deleteProgram(name: string) {
    const url = `${this.url_mgmt}/program/${name}`;

    return this.http.delete(url, '')
      .map(this.extractData);
  }

  public createProgram(name: string): Observable<IProgramInfo> {
    const url = `${this.url_mgmt}/program/${name}`;

    return this.http.post(url, undefined)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
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
