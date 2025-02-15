import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  sourceRouter!: BehaviorSubject<any>;
  destRouter!: BehaviorSubject<any>;

  constructor(private http:HttpClient) { }

  getAllLines(val: string) {
    return this.http.get('http://localhost:4000/stationList/'+val);
  }

  getUCandFeederLines(val: string) {
    return this.http.get('http://localhost:4000/stationList/'+val);
  }

  getStationInfo(loc: string, val: string) {
    return this.http.get('http://localhost:4000/stationInfo/'+loc+'/'+val);
  }

  getAllStations(loc: string) {
    return this.http.get('http://localhost:4000/allStations/'+loc);
  }

  setRoutePlannerSource(data: any) {
    this.sourceRouter = data;
  }

  getRoutePlannerSource() {
    return new BehaviorSubject<any>(this.sourceRouter);
  }

  setRoutePlannerDest(data: any) {
    this.destRouter = data;
  }

  getRoutePlannerDest() {
    return new BehaviorSubject<any>(this.destRouter)
  }
}
