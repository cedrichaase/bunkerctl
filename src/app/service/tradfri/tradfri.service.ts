import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../../environments/environment';


@Injectable()
export class TradfriService {
  private url = environment.endpoints.tradfri;

  constructor(private http: Http) { }

  public toggle() {
    const url = `${this.url}/toggle`;

    return this.http.put(url, {})
      .toPromise();
  }

  public hue() {
    const url = `${this.url}/hue`;

    return this.http.put(url, {})
      .toPromise();
  }

  public incBrightness() {
    const url = `${this.url}/up`;

    return this.http.put(url, {})
      .toPromise();
  }

  public decBrightness() {
    const url = `${this.url}/down`;

    return this.http.put(url, {})
      .toPromise();
  }
}
