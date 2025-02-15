import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { ServicesService } from '../services/services.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search-station-name',
  imports: [SideNavComponent, NgStyle, RouterLink],
  templateUrl: './search-station-name.component.html',
  styleUrl: './search-station-name.component.scss'
})
export class SearchStationNameComponent {
  valforRM = '';
  stationName: any;
  location: any;
  stationDetails: any = [];
  collapsed = true;
  stationList: any = [];
  tempTable = [];
  tempTableArr: any = [];
  constructor(private act: ActivatedRoute, private serv: ServicesService, private router: Router) {
    this.act.params.subscribe({
      next: (res: any)=> {
        this.stationName = res.id;
        this.location = res.loc;
        this.getStationData();
      }, error: (err: any)=> {
        this.router.navigate(['/home']);
      }
    })
  }

  getStationData() {
    this.stationList = [];
    this.tempTable = [];
    this.tempTableArr = [];
    this.serv.getStationInfo(this.location, this.stationName).subscribe({
      next: (res: any)=>{
        this.stationDetails = res.data;
        console.log(this.stationDetails);
        for (let val of this.stationDetails) {
          this.stationList.push([Object.keys(val)])
        }
        console.log(this.stationList);
      }, error: (err: any)=> {
        this.router.navigate(['/home']);
      }
    })
    
  }

  setRouteDetails(val: any, list: any) {
    this.tempTable = val;
    this.tempTableArr = list;
  }

  setValuesforRoutePlanner() {
    if (this.valforRM === 'Source') {
      this.serv.setRoutePlannerSource(this.stationName);
    } else {
      this.serv.setRoutePlannerDest(this.stationName);
    }
  }
  
  

}
