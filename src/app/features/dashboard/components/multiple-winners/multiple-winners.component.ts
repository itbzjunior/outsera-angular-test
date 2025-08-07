import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { YearWithMultipleWinners } from '@shared/models/movie';
import { MovieService } from '@shared/services/movie.service';
import { finalize, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'table-multiple-winners',
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './multiple-winners.component.html',
  styleUrl: './multiple-winners.component.scss'
})
export class MultipleWinnersComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['year', 'winnerCount'];
  dataSource: YearWithMultipleWinners[] = [];
  isLoading: boolean = true;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    
    this.isLoading = true;

    this.movieService.getYearsWithMultipleWinners()
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false)
      )
      .subscribe(result => (this.dataSource = result.years));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
