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

  // Colunas disponíveis na tabela dos filmes
  displayedColumns: string[] = ['name', 'winCount'];

  // Variavel que receberá a fonte dos dados da tabela para visualização
  dataSource: StudioCountPerWin[] = [];

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
    this.movieService.getStudiosWithWinCount()
      .pipe(
        takeUntil(this._unsubscribeAll),
        finalize(() => this.isLoading = false) // Ao finalizar, esconde o loader
      )
      .subscribe(
        (result) => this.dataSource = result.studios.slice(0, 3) // Apenas os 3 primeiros registros
      );
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
