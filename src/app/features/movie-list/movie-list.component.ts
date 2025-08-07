import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieResponse, PageMovieResponse } from '@shared/models/movie';
import { MovieService } from '@shared/services/movie.service';
import { finalize, takeUntil, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'year', 'title', 'studios', 'producers', 'winner'];
  dataSource: MovieResponse[] = [];
  resultsLength = 0;
  isLoading: boolean = true;

  form = new FormGroup({
    winner: new FormControl(null),
    year: new FormControl('')
  });

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService,
  ) {}

  /**
   * On afterViewInit
   */
  ngAfterViewInit(): void {

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.loadMovies();
        }),
        map((data: PageMovieResponse) => {
          
          // Se os dados forem NULL
          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;

          // Retorna apenas o "content", que contém os filmes da lista
          return data.content;
        }),
      )
      .subscribe(content => (this.dataSource = content));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * Carrega os filmes
   */
  private loadMovies() {

    this.isLoading = true;

    const page = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const winner = this.form.controls.winner.value;
    const year = this.form.controls.year.value;
    
    return this.movieService.getMovies(page, pageSize, winner, year)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false)
      );
  }

  /**
   * Carrega os filmes
   */
  filterMovies() {
    this.paginator.pageIndex = 0; // Reseta a página para a primeira

    this.loadMovies()
      .subscribe(data => {
        this.dataSource = data.content;
        this.resultsLength = data.totalElements;
      });
  }

}
