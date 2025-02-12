import { NgStyle } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';
import { StationNameModalComponent } from '../shared/station-name-modal/station-name-modal.component';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgStyle, RouterLink, StationNameModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor() {}
  
  locationVal: any;
  val: any = '';
  @ViewChild(StationNameModalComponent) stationNameModal!: StationNameModalComponent;

  ngOnInit(): void {
    this.setLocation();
  }  

  setLocation() {
    switch (this.locationVal) {
      case 'option1': {
        this.val = 'Americas';
        break;
      }
      case 'option2': {
        this.val = 'Europe';
        break;
      }
      case 'option3': {
        this.val = 'Kolkata';
        break;
      }
      case 'option4': {
        this.val = 'Bengaluru';
        break;
      }
      default: {
        this.val = ''
        break;
      }
    }
    sessionStorage.setItem('Location', this.val);
    if (sessionStorage.getItem('Location')) {
      this.stationNameModal.getLocationStations(this.val);
    }
  }



}
