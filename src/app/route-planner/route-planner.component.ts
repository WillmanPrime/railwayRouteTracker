import { Component } from '@angular/core';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { ServicesService } from '../services/services.service';
import { Router, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-route-planner',
  imports: [SideNavComponent, NgStyle, RouterLink],
  templateUrl: './route-planner.component.html',
  styleUrl: './route-planner.component.scss'
})
export class RoutePlannerComponent {
  collapsed = true;
  location: any;
  stationList: any = [];
  stationArray: any = [];
  sourceStation: any;
  destinationStation: any;
  routeFound = 0;
  tempStationstoWatch: any = [];
  routeArray: any = [];
  stationsVisited: any = [];
  tempStationHalt: any = [];
  carryOnCont = true;

  constructor(private serv: ServicesService, private router: Router) {
    this.location = sessionStorage.getItem('Location');
    this.serv.getRoutePlannerSource().subscribe({
      next: (res: any)=> {
        this.sourceStation = res;
      }
    });
    this.serv.getRoutePlannerDest().subscribe({
      next: (res: any)=> {
        this.destinationStation = res;
      }
    });

    this.getStationDetails();
  }

  getStationDetails() {
    this.serv.getAllStations(this.location).subscribe({
      next: (res: any) => {
        this.stationList = res.data;
      }, error: (err: any) => {
        this.router.navigate(['/home']);
      }
    })
    this.serv.getAllLines(this.location).subscribe({
      next: (res: any) => {
        for (let entry of res.line) {
          this.stationArray.push(this.getKeyByValue(entry))
        }
      }, error: (err: any) => {
        this.router.navigate(['/home']);
      }
    })
  }

  getKeyByValue(obj: any) {
    return Object.entries(obj)
      .reduce((acc: any, [key, val]) => {
        acc.push([key, val]);
        return acc;
      }, []);
  }

  findRoute() {
    this.revertAllData();
    this.routePlanner(this.sourceStation, this.destinationStation);
    this.segregateData();
    console.log(this.routeArray);

  }

  revertAllData() {
    this.routeArray = [];
    this.tempStationstoWatch = [];
    this.stationsVisited = [];
  }

  swapStations(src: any, des: any) {
    this.sourceStation = des;
    this.destinationStation = src;
  }

  findCommonElements(arr1: number[], arr2: number[]): any {
    let commonElements = [];
    for (let ent of arr1) {
      for (let ent1 of arr2) {
        if (JSON.stringify(ent) === JSON.stringify(ent1)) {
          commonElements.push(ent);
          this.tempStationHalt = [ent1];
        }
      }
    }
    if (commonElements.length === 0) {
      return false;
    } else {
      return commonElements;
    }
  }

  routePlanner(src: any, des: any) {
    let tempStartArray = [];
    let tempFinishArray = [];
    this.routeFound = 2;
    for (let entry of this.stationArray) {
      for (let val of entry) {
        if (val[0] === src) {
          tempStartArray.push(entry);
        }
        if (val[0] === des) {
          tempFinishArray.push(entry);
        }
      }
    }

    if (this.findCommonElements(tempStartArray, tempFinishArray)) {
      this.routeArray.push([this.tempStationHalt, src, des]);
      this.routeFound = 1;
      return;
    }

    else {
      let commonRoute = false;
      for (let i = 0; i < tempStartArray.length; i++) {
        for (let j = 0; j < tempFinishArray.length; j++)
          if (this.findCommonElements(tempStartArray[i], tempFinishArray[j])) {
            commonRoute = true;
            let common = this.findCommonElements(tempStartArray[i], tempFinishArray[j])
            this.routeArray.push([[tempStartArray[i]], src, common[0][0]]);
            this.stationsVisited.push(common[0][0]);
            this.routePlanner(common[0][0], des);
            break;
          }
      }
      if (!commonRoute) {
        for (let item of tempStartArray) {
          let routeExists = false;
          for (let val of this.routeArray) {
            if (JSON.stringify(val[0]) === JSON.stringify(item)) {
              routeExists = true;
              break;
            }
          }
          if (!routeExists) {
            for (let val of item) {
              if (val[1] === 'Y' && val[0] !== src && !this.stationsVisited.includes(val[0])) {
                this.routeArray.push([[item], src, val[0]]);
                this.stationsVisited.push(val[0]);
                this.routePlanner(val[0], des);
              }
            }
          }
        }
      }

    }

    this.routeFound = 1;
  }

  segregateData() {
    let newArr = [];
    for (let i = 0; i < this.routeArray.length; i++) {
      if (this.routeArray[i][2] === this.destinationStation) {
        newArr = this.routeArray.filter((ele: any, ind: any) => ind <= i)
      }
    }
    this.routeArray = newArr;
    this.checkForContinuous();
    this.checkForSameRoutes();
    this.clearStationsVisited();
    this.checkForDuplicates();
  }

  removeDatafromArray(arr: any, ind: number) {
    arr.splice(ind, 1);
    return arr;
  }

  checkForContinuous() {
    this.carryOnCont = true;
    for (let i = this.routeArray.length - 1; i >= 0; --i) {
      if (i>0 && this.routeArray[i][1] !== this.routeArray[i - 1][2]) {
        this.routeArray = this.removeDatafromArray(this.routeArray, i - 1);
        break;
      }
      if (i===0) {
        this.carryOnCont = false;
      }
    }
    if (this.carryOnCont) {
      this.checkForContinuous();
    }
  }

  checkForSameRoutes() {
    this.carryOnCont = true;
    for (let i=0; i<this.routeArray.length; i++) {
      if (i < this.routeArray.length-1 && JSON.stringify(this.routeArray[i][0]) === JSON.stringify(this.routeArray[i+1][0])) {
        this.routeArray[i][2] = this.routeArray[i+1][2]
        this.routeArray = this.removeDatafromArray(this.routeArray, i + 1);
        break;
      }
      if (i===this.routeArray.length - 1) {
        this.carryOnCont = false;
      }
    }
    if (this.carryOnCont) {
      this.checkForSameRoutes();
    }
  }

  clearStationsVisited() {
    let arr: any = [];
    for (let entry of this.stationsVisited) {
      if (!arr.includes(entry)) {
        arr.push(entry);
      }
    }
    this.stationsVisited = arr;
  }

  checkForDuplicates() {
    for (let i=0; i<this.routeArray.length; i++) {
      if (this.routeArray[i][1] === this.routeArray[i][2]) {
        this.routeArray = this.removeDatafromArray(this.routeArray, i);
      }
    }
  }


}
