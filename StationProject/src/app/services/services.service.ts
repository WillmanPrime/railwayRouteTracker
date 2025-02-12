import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

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
}
