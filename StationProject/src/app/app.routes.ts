import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListOfLinesComponent } from './list-of-lines/list-of-lines.component';
import { SearchStationNameComponent } from './search-station-name/search-station-name.component';
import { FeederConstLinesComponent } from './feeder-const-lines/feeder-const-lines.component';
import { RoutePlannerComponent } from './route-planner/route-planner.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'alllines/:id', component: ListOfLinesComponent },
    { path: 'station/:loc/:id', component: SearchStationNameComponent},
    { path: 'alllines/UC/:id', component: FeederConstLinesComponent},
    { path: 'alllines/Feeder/:id', component: FeederConstLinesComponent},
    { path: 'routePlanner', component: RoutePlannerComponent },
    { path:'', redirectTo:'home', pathMatch:'full'},
    { path: '**', component: HomeComponent }
];
