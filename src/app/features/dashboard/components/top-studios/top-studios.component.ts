import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { StudioCountPerWin } from '@shared/models/movie';
import { MovieService } from '@shared/services/movie.service';
import { finalize, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'table-top-studios',
  imports: [MatProgressSpinnerModule, MatTableModule],
  templateUrl: './top-studios.component.html',
  styleUrl: './top-studios.component.scss'
})
export class TopStudiosComponent implements OnInit {

  displayedColumns: string[] = ['name', 'winCount'];
  dataSource: StudioCountPerWin[] = [];
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
    
    this.movieService.getStudiosWithWinCount()
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (result) => this.dataSource = result.studios.slice(0, 3) // Apenas os 3 primeiros registros
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
