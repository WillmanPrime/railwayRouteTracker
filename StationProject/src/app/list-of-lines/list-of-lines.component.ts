import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-list-of-lines',
  imports: [NgClass, NgStyle, RouterLink, SideNavComponent],
  templateUrl: './list-of-lines.component.html',
  styleUrl: './list-of-lines.component.scss'
})
export class ListOfLinesComponent {
  location: any = '';
  collapsed = true;
  error = false;
  stationData: any;
  stationList: any = [];

  constructor(private service: ServicesService, private act: ActivatedRoute, private router: Router) {
    this.act.params.subscribe({
      next: (res: any)=> {
        this.stationList = [];
        this.location = res.id;
        this.service.getAllLines(this.location).subscribe({
          next: (res1: any)=> {
          this.stationData = res1.line;
          console.log(this.stationData);
          for (let item of this.stationData) {
            this.stationList.push([Object.keys(item)]);
          }
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
