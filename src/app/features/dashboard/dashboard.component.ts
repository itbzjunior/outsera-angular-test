import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WinnersByYearComponent } from './components/winners-by-year/winners-by-year.component';
import { MultipleWinnersComponent } from './components/multiple-winners/multiple-winners.component';
import { ProducersIntervalComponent } from './components/producers-interval/producers-interval.component';
import { TopStudiosComponent } from './components/top-studios/top-studios.component';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, WinnersByYearComponent, MultipleWinnersComponent, ProducersIntervalComponent, TopStudiosComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
