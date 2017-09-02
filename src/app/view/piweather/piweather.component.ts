import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-piweather',
  templateUrl: './piweather.component.html',
  styleUrls: ['./piweather.component.css']
})
export class PiweatherComponent {
  url = environment.endpoints.piweather;

  constructor(private sanitizer: DomSanitizer) {}
}
