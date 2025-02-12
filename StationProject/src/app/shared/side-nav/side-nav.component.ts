import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StationNameModalComponent } from '../station-name-modal/station-name-modal.component';
import { LocationModalComponent } from "../location-modal/location-modal.component";
import { NgIf } from '@angular/common';
import { MoreInfoModalComponent } from '../more-info-modal/more-info-modal.component';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, StationNameModalComponent, LocationModalComponent, MoreInfoModalComponent],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  location: any;
  feedline = (window.location.href.includes('Feeder') || window.location.href.includes('UC')) ? true : false;
  @ViewChild(StationNameModalComponent) stationNameModal!: StationNameModalComponent;
  @ViewChild(MoreInfoModalComponent) MoreInfoModal!: MoreInfoModalComponent;
  constructor(private router: Router) {
  }

  setLocation() {
      this.location = sessionStorage.getItem('Location');
      this.stationNameModal.getLocationStations(this.location);
  }

  redirectToFeeder() {
    this.location = sessionStorage.getItem('Location');
    if (this.location === "Americas" || this.location === "Europe" ) {
      this.router.navigate(["alllines/Feeder", this.location]);
    } else {
      this.router.navigate(["alllines/UC", this.location]);
    }
  }

  redirectToMainLines() {
    this.location = sessionStorage.getItem('Location');
    this.router.navigate(["alllines", this.location]);
  }

}
