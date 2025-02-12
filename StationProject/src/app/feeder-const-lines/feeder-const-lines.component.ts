import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { NgClass, NgStyle } from '@angular/common';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';

@Component({
  selector: 'app-feeder-const-lines',
  imports: [NgClass, NgStyle, RouterLink, SideNavComponent],
  templateUrl: './feeder-const-lines.component.html',
  styleUrl: './feeder-const-lines.component.scss'
})
export class FeederConstLinesComponent {
  location: any = '';
  locationDisplay = '';
    collapsed = true;
    error = false;
    stationList: any = [];
    ucline = window.location.href.includes('UC') ? "UC" : "Feeder";
  
    constructor(private service: ServicesService, private act: ActivatedRoute, private router: Router) {
      this.act.params.subscribe({
        next: (res: any)=> {
          this.stationList = [];
          this.locationDisplay = res.id;
          this.location = res.id + this.ucline;
          this.service.getUCandFeederLines(this.location).subscribe({
            next: (res1: any)=> {
            this.stationList = res1.line;
            console.log(this.stationList);
        }, error: (err: any)=> {
          this.router.navigate(['/home']);
        }
      })
        }, error: (err: any)=> {
          this.router.navigate(['/home']);
        }
      })
    }
}
