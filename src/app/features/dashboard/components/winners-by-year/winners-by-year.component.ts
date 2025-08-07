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

  // Colunas disponíveis na tabela dos filmes
  displayedColumns: string[] = ['id', 'year', 'title'];

  // Variavel que receberá a fonte dos dados da tabela para visualização
  dataSource: MovieResponse[] = [];

  // Variavel de controle para mostrar o loader na página enquanto houver requisições pendentes
  isLoading: boolean = false;

  // Definição do input para filtro por ano, sendo o valor padrão o ano atual
  currentYear = new Date().getFullYear();
  year = new FormControl(this.currentYear.toString(), {
    nonNullable: true, // Não aceita valor "null"
    validators: [
      Validators.required, // Validador de campo obrigatório
      Validators.pattern('[0-9]+'), // Validador de apenas números
    ]
  });

  // Variavel de controle para "unsubscribe" nas Observables que ainda não foram concluídas
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService
  ) { }

  /**
   * Lifecycle: Ao iniciar o componente
   */
  ngOnInit(): void {
    this.loadMovieWinnersByYear();
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
   * Carrega os filmes vencedores por ano
   */
  private loadMovieWinnersByYear() {

    // Se o formulário é inválido
    if (this.year.invalid) {
      return; // Para a execução
    }

    // Mostra o loader enquanto a chamada acontecer
    this.isLoading = true;
    
    // Faz a chamada ao serviço da API, buscando os dados
    this.movieService.getWinnersByYear(this.year.value)
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false) // Ao finalizar, esconde o loader
      )
      .subscribe(result => (this.dataSource = result));
  }

  /**
   * Buscar filmes por ano
   */
  searchMovie(event: any): void {

    // Filtrar itens
    this.loadMovieWinnersByYear();
  }

}
