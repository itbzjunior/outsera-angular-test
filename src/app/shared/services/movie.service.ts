import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MovieResponse, PageMovieResponse, YearsWithMultipleWinnersResponse, StudiosWithWinCountResponse, ProducerWinIntervalResponse } from '../models/movie';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

	private readonly API_URL = 'https://challenge.outsera.tech/api/movies';

	constructor(
		public http: HttpClient
	) { }

  /**
   * Recupera dados dos filmes
   * 
   * @param page    Número da página
   * @param size    Tamanho do resultado por página
   * @param winner  Se retorna apenas vencedores
   * @param year    Ano do filme
   */
	getMovies(
    page: number = 0,
    size: number = 10,
    winner: boolean|null,
    year: string|null
  ): Observable<PageMovieResponse> {

    // Define a URL do recurso a ser chamado
    let url = this.API_URL;

    // Define os headers e outros parâmetros da requisição
    let options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Define a paginação do recurso
    options.params = options.params.set('page', page);
    options.params = options.params.set('size', size);

    // Se for definido "winner", seta o parâmetro na requisição
    if( winner !== null ) {
      options.params = options.params.set('winner', winner);
    }

    // Se for definido "year", seta o parâmetro na requisição
    if( year !== null ) {
      options.params = options.params.set('year', year);
    }

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<PageMovieResponse>(url, options).pipe(
      catchError( this.handleError<PageMovieResponse>('getMovies') )
    );
	}

  /**
   * Recupera um filme por ID
   * 
   * @param id    ID do registro
   */
	getMovieById(id: number): Observable<MovieResponse> {

    // Define a URL do recurso a ser chamado
    let url = `${this.API_URL}/${id}`;

    // Define os headers e outros parâmetros da requisição
    let options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<MovieResponse>(url, options).pipe(
      catchError( this.handleError<MovieResponse>('getMovieById') )
    );
	}

  /**
   * Pega os anos com multiplos vencedores
   */
	getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {

    // Define a URL do recurso a ser chamado
    let url = `${this.API_URL}/yearsWithMultipleWinners`;

    // Define os headers e outros parâmetros da requisição
    let options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<YearsWithMultipleWinnersResponse>(url, options).pipe(
      catchError( this.handleError<YearsWithMultipleWinnersResponse>('getYearsWithMultipleWinners') )
    );
	}

  /**
   * Pega os filmes vencedores por ano
   * 
   * @param year    Ano do filme
   */
	getWinnersByYear(year: string): Observable<MovieResponse[]> {

    // Se o campo for vazio, retorna um erro
    if( year == '' ) {
      throw new Error('Campo "year" vázio.');
    }

    // Define a URL do recurso a ser chamado
    let url = `${this.API_URL}/winnersByYear`;

    // Define os headers e outros parâmetros da requisição
    let options = {
      params: new HttpParams(),
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Define a paginação do recurso
    options.params = options.params.set('year', year);

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<MovieResponse[]>(url, options).pipe(
      catchError( this.handleError<MovieResponse[]>('getWinnersByYear') )
    );
	}

  /**
   * Pega os estudios com contagem de vitórias
   */
	getStudiosWithWinCount(): Observable<StudiosWithWinCountResponse> {

    // Define a URL do recurso a ser chamado
    let url = `${this.API_URL}/studiosWithWinCount`;

    // Define os headers e outros parâmetros da requisição
    let options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<StudiosWithWinCountResponse>(url, options).pipe(
      catchError( this.handleError<StudiosWithWinCountResponse>('getStudiosWithWinCount') )
    );
	}

  /**
   * Pega os interválos entre vitórias mínimos e máximos dos produtores
   */
	getMaxMinWinIntervalForProducers(): Observable<ProducerWinIntervalResponse> {

    // Define a URL do recurso a ser chamado
    let url = `${this.API_URL}/maxMinWinIntervalForProducers`;

    // Define os headers e outros parâmetros da requisição
    let options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<ProducerWinIntervalResponse>(url, options).pipe(
      catchError( this.handleError<ProducerWinIntervalResponse>('getMaxMinWinIntervalForProducers') )
    );
	}
  
  /**
   * Lida com o erro da requisição HTTP. Permite o app continuar rodando.
   *
   * @param operation - Nome da operação que falhou
   * @param result - Resultado opcional do erro
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error);
  
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} falhou: ${error.message}`);
  
      // App continua rodando ao retornar um resultado vazio
      return of(result as T);
    };
  }
}
