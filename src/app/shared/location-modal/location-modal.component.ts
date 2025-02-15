import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-location-modal',
  imports: [NgStyle, FormsModule, RouterLink],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.scss'
})
export class LocationModalComponent {
  @Input() locationVal: any;
  window = window.location.href.includes('alllines');
  feedline = window.location.href.includes('Feeder') ? true : false;
  constLine = window.location.href.includes('UC') ? true : false;

  constructor(private router: Router, private serv: ServicesService) { }

  confirmLocation() {
    this.serv.setRoutePlannerSource(null);
    this.serv.setRoutePlannerDest(null);
    sessionStorage.setItem('Location', this.locationVal);
    if (this.feedline) {
      this.router.navigate(['/alllines/Feeder', this.locationVal]);
    } else if (this.constLine) {
      this.router.navigate(['/alllines/UC', this.locationVal]);
    } else {
      this.router.navigate(['/alllines', this.locationVal]);
    }

  }
}
