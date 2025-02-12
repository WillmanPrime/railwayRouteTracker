import { Component } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-station-name-modal',
  imports: [NgStyle, RouterLink, FormsModule],
  templateUrl: './station-name-modal.component.html',
  styleUrl: './station-name-modal.component.scss'
})
export class StationNameModalComponent {

  searchByStationName = false;
  location: any;
  stationData: any = [];
  stationList: any = [];
  allStations: any = [];
  filterWord: any = '';
  filteredData: any = [];

  constructor(private services: ServicesService, private serv: ServicesService, private router: Router) { }

  getLocationStations(val: any) {
    this.location = val;
    this.stationData = [];
    this.stationList = [];
    this.services.getAllLines(val).subscribe({
      next: (res: any) => {
        this.stationData = res.line;
        console.log(res.line);
        for (let entry of this.stationData) {
          this.stationList.push(Object.keys(entry));
        }
        console.log(this.stationList);
      }, error: (err: any)=> {
        this.router.navigate(['/home']);
      }
    })
    this.revertData();
    this.getAllStationsofLLine();
  }

  getAllStationsofLLine() {
    if (this.searchByStationName) {
      this.serv.getAllStations(this.location).subscribe({
        next: (res: any) => {
          this.allStations = res.data;
        }, error: (err: any)=> {
          this.router.navigate(['/home']);
        }
      })
    }
  }

  filterData() {
    this.filteredData = [];
    for (let item of this.allStations) {
      if (item.toLowerCase().includes(this.filterWord.toLowerCase())) {
        this.filteredData.push(item);
      }
    }
  }

  revertData() {
    this.searchByStationName = false;
    this.filterWord = '';
    this.filteredData = [];
  } 



}
