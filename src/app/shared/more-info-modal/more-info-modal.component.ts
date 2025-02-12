import { Component, Input } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more-info-modal',
  imports: [],
  templateUrl: './more-info-modal.component.html',
  styleUrl: './more-info-modal.component.scss'
})
export class MoreInfoModalComponent {
  locationVal: any;
  stationCount = 0;
  feederLines = 0;
  operationalLineCount = 0;
  feederCount = 0;
  interchangeCount = 0;

  constructor(private serv: ServicesService, private router: Router) {}

  setLocation() {
    this.locationVal = sessionStorage.getItem('Location');
    this.computeData();
  }

  computeData() {
    //stationCount
    this.serv.getAllStations(this.locationVal).subscribe({
      next: (res: any)=> {
        this.stationCount = res.data.length;
      }, error: (err: any)=> {
        this.router.navigate(['/home']);
      }
    })
    //operationalLineCount
    this.serv.getAllLines(this.locationVal).subscribe({
      next: (res: any)=> {
        let stationObjArr = [];
        let stationObj: any = [];
        this.operationalLineCount = res.line.length;
      //interChange count
        for (let item of res.line) {
          stationObjArr.push(this.getKeyByValue(item, 'Y'));
        }
        console.log(stationObjArr);
        for (let val of stationObjArr) {
          for (let i of val) {
            if (!stationObj.includes(i)) {
              stationObj.push(i)
            }
          }
        }
        this.interchangeCount = stationObj.length;
      }, error: (err: any)=> {
        this.router.navigate(['/home']);
      }
    })
    //feeder/UC Count
    if (this.locationVal === 'Americas' || this.locationVal === 'Europe') {
      this.serv.getUCandFeederLines(this.locationVal + 'Feeder').subscribe({
        next: (res: any)=> {
          this.feederCount = res.line.length;
        }, error: (err: any)=> {
          this.router.navigate(['/home']);
        }
      })
    } else {
      this.serv.getUCandFeederLines(this.locationVal + 'UC').subscribe({
        next: (res: any)=> {
          this.feederCount = res.line.length;
        }, error: (err: any)=> {
          this.router.navigate(['/home']);
        }
      })
    }
  }

  getKeyByValue(obj: any, value: any) {
    return Object.entries(obj)
    .reduce((acc:any, [key, val]) => {
        if (val === value) {
            acc.push(key);
        }
        return acc;
    }, []);
}
  
}
