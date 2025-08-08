import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieResponse, PageMovieQueryParams, PageMovieResponse } from '@shared/models/movie';
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

  // Colunas disponíveis na tabela dos filmes
  displayedColumns: string[] = ['id', 'year', 'title', 'studios', 'producers', 'winner'];

  // Variavel que receberá a fonte dos dados da tabela para visualização
  dataSource: MovieResponse[] = [];

  // Contagem total de registros da tabela, preenchido após a chamada do serviço da API
  resultsLength = 0;

  // Variavel de controle para mostrar o loader na página enquanto houver requisições pendentes
  isLoading: boolean = true;

  // Definição do formulário para filtrar os dados da tabela
  form = new FormGroup({
    winner: new FormControl(undefined, {
      nonNullable: true, // Não aceita valor "null"
    }),
    year: new FormControl('', {
      nonNullable: true, // Não aceita valor "null"
    })
  });

  // ViewChild da paginação
  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator;

  // Variavel de controle para "unsubscribe" nas Observables que ainda não foram concluídas
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService,
  ) {}

  /**
   * Lifecycle: Após iniciar a view do componente
   */
  ngAfterViewInit(): void {

    // Carrega a tabela com os resultados da primeira página
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.loadMovies(); // Carrega os filmes
        }),
        map((data: PageMovieResponse) => {
          
          // Se os dados forem NULL, retorna uma array vazia
          if (data === null) {
            return [];
          }

          // Atualiza o total de elementos
          this.resultsLength = data.totalElements;

          // Retorna apenas o "content", que contém os filmes da lista
          return data.content;
        }),
      )
      .subscribe(content => (this.dataSource = content));
  }

  /**
   * Lifecycle: Ao destruir o componente
   */
  ngOnDestroy(): void {
    // Cancela todas as Observables pendentes
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  /**
   * Carrega os filmes
   */
  private loadMovies() {

    // Variavel para mostrar o loader enquanto a chamada acontece
    this.isLoading = true;

    // Define os parâmetros para filtrar os resultados na chamada
    const params: PageMovieQueryParams = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      winner: this.form.controls.winner.value ?? undefined,
      year: this.form.controls.year.value
    }
    
    // Retorna a observable do serviço
    return this.movieService.getMovies(params)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false) // Ao finalizar, esconde o loader
      );
  }

  /**
   * Ação de filtrar os filmes
   */
  filterMovies() {
    this.paginator.pageIndex = 0; // Reseta a página para a primeira

    // Carrega os filmes com os filtros informados
    this.loadMovies()
      .subscribe(data => {
        this.dataSource = data.content;
        this.resultsLength = data.totalElements;
      });
  }

}
