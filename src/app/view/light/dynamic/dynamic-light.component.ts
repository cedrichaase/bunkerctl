import { Component, OnInit } from '@angular/core';
import {RgbRealtimeService} from '../../../service/rgb-realtime/rgb-realtime.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  restartOnSave: boolean;

  updateName: string;
  newName: string;
  deleteName: string;

  constructor(private rgbRealtime: RgbRealtimeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.refreshAndSelect();
  }

  refreshAndSelect(programName?) {
    this.rgbRealtime.getPrograms()
      .subscribe(programs => {
        this.programs = programs;

        this.rgbRealtime.getActiveProgram()
          .subscribe(activeProgram => {
            if (activeProgram) { this.activeProgram = activeProgram; }
            this.selectProgram(programName || activeProgram || programs[0]);
          });
      });
  }

  selectProgram(newProgram) {
    this.rgbRealtime.getProgram(newProgram)
      .subscribe(info => {
        this.code = info.content;
      });

    this.selectedProgram = newProgram;
  }

  runProgram(newProgram) {
    this.rgbRealtime.setActiveProgram(newProgram)
      .subscribe(program => {
        this.activeProgram = newProgram;
      });
  }

  stopProgram() {
    this.rgbRealtime.stopActiveProgram().subscribe(() => {
      this.activeProgram = '';
    });
  }

  createProgram(name) {
    this.rgbRealtime.createProgram(name).subscribe(info => {
      this.refreshAndSelect(info.name);
    });

    this.newName = '';
  }

  saveProgram() {
    this.rgbRealtime.saveProgram(this.selectedProgram, {name: this.updateName, content: this.code})
      .subscribe(info => {
        if (this.restartOnSave) {
          this.runProgram(this.selectedProgram);
        }

        this.refreshAndSelect(info.name);
      });
  }

  deleteProgram(name) {
    this.rgbRealtime.deleteProgram(name)
      .subscribe(() => {
        this.deleteName = '';
        this.refreshAndSelect();
      });
  }

  openModal(content) {
    this.modalService.open(content);
  }
}
