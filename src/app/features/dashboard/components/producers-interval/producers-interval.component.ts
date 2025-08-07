import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ProducerWinInterval } from '@shared/models/movie';
import { MovieService } from '@shared/services/movie.service';
import { finalize, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'table-producers-interval',
  imports: [MatProgressSpinnerModule, MatTableModule],
  templateUrl: './producers-interval.component.html',
  styleUrl: './producers-interval.component.scss'
})
export class ProducersIntervalComponent implements OnInit {

  displayedColumns: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  minDataSource: ProducerWinInterval[] = [];
  maxDataSource: ProducerWinInterval[] = [];
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
    
    this.movieService.getMaxMinWinIntervalForProducers()
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (result) => {
          this.minDataSource = result.min;
          this.maxDataSource = result.max;
        }
      );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

}