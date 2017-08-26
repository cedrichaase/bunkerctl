import { Component, OnInit } from '@angular/core';
import {RgbRealtimeService} from '../../../service/rgb-realtime/rgb-realtime.service';

@Component({
  selector: 'app-light-dynamic',
  templateUrl: './dynamic-light.component.html',
  styleUrls: ['./dynamic-light.component.css']
})
export class DynamicLightComponent implements OnInit {
  selectedProgram: string;
  activeProgram: string;
  programs: string[];
  code: string;

  constructor(private rgbRealtime: RgbRealtimeService) { }

  ngOnInit() {

    this.rgbRealtime.getPrograms()
      .subscribe(programs => {
        this.programs = programs;
        this.selectProgram(programs[0]);
      });

    this.rgbRealtime.getActiveProgram()
      .subscribe(activeProgram => {
        if (activeProgram) {
          this.activeProgram = activeProgram;
          this.rgbRealtime.getProgram(activeProgram)
            .subscribe(activeProgramInfo => {
              this.code = activeProgramInfo.content;
            });
        }
      });
  }

  selectProgram(newProgram) {
    this.rgbRealtime.getProgram(newProgram)
      .subscribe(info => {
        console.log(info);
        this.code = info.content;
      });

    this.selectedProgram = newProgram;
  }

  runProgram(newProgram) {
    this.rgbRealtime.setActiveProgram(newProgram)
      .subscribe(program => {
        console.log(`set program to ${program}`);
      });
  }

  stopProgram() {
    this.rgbRealtime.stopActiveProgram().subscribe(() => {
      console.log('program stopped!');
    });
  }

  saveProgram() {
    this.rgbRealtime.saveProgram(this.selectedProgram, this.code)
      .subscribe(info => {
        console.log('saved program', info);
      });
  }


}
