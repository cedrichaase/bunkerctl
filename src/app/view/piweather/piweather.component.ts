import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-piweather',
  templateUrl: './piweather.component.html',
  styleUrls: ['./piweather.component.css']
})
export class PiweatherComponent {
  url = environment.endpoints.piweather;

  constructor() {}
}
