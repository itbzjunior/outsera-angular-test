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

  // Colunas disponíveis na tabela dos filmes
  displayedColumns: string[] = ['year', 'winnerCount'];

  // Variavel que receberá a fonte dos dados da tabela para visualização
  dataSource: YearWithMultipleWinners[] = [];

  // Variavel de controle para mostrar o loader na página enquanto houver requisições pendentes
  isLoading: boolean = true;

  // Variavel de controle para "unsubscribe" nas Observables que ainda não foram concluídas
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private movieService: MovieService,
  ) {}

  /**
   * Lifecycle: Ao iniciar o componente
   */
  ngOnInit(): void {
    
    // Mostra o loader enquanto a chamada acontecer
    this.isLoading = true;

    // Faz a chamada ao serviço da API, buscando os dados
    this.movieService.getYearsWithMultipleWinners()
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false) // Ao finalizar, esconde o loader
      )
      .subscribe(result => (this.dataSource = result.years));
  }

  /**
   * Lifecycle: Ao destruir o componente
   */
  ngOnDestroy(): void {
    // Cancela todas as Observables pendentes
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
