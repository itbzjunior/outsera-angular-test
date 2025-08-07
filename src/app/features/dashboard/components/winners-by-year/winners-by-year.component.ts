import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MovieResponse } from '@shared/models/movie';
import { MovieService } from '@shared/services/movie.service';
import { finalize, takeUntil, Subject } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'table-winners-by-year',
  imports: [FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './winners-by-year.component.html',
  styleUrl: './winners-by-year.component.scss'
})
export class WinnersByYearComponent implements OnInit {

  displayedColumns: string[] = ['id', 'year', 'title'];
  dataSource: MovieResponse[] = [];
  isLoading: boolean = false;

  year = new FormControl('2025', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]
  });

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService
  ) { }

  /**
   * On init
   */
  ngOnInit(): void {
    this.loadMovieWinnersByYear();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * Carrega os filmes vencedores por ano
   */
  private loadMovieWinnersByYear() {

    // Return if the form is invalid
    if (this.year.invalid) {
      return; // Stop execution
    }

    this.isLoading = true;
    
    this.movieService.getWinnersByYear(this.year.value)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false)
      )
      .subscribe(result => (this.dataSource = result));
  }

  /**
   * Buscar filmes por ano
   */
  searchMovie(event: any): void {

      // Filter itens
      this.loadMovieWinnersByYear();
  }

}
