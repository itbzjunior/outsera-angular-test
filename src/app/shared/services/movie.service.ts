import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MovieResponse, PageMovieQueryParams, PageMovieResponse, YearsWithMultipleWinnersResponse, StudiosWithWinCountResponse, ProducerWinIntervalResponse } from '../models/movie';
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
   * @param params  Parametros para filtro
   */
	getMovies(params: PageMovieQueryParams): Observable<PageMovieResponse> {

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
    options.params = options.params.set('page', params.page ?? 0);
    options.params = options.params.set('size', params.size ?? 10);

    // Se for definido "winner", seta o parâmetro na requisição
    if( typeof params.winner !== 'undefined' ) {
      options.params = options.params.set('winner', params.winner);
    }

    // Se for definido "year", seta o parâmetro na requisição
    if( typeof params.year !== 'undefined' ) {
      options.params = options.params.set('year', params.year);
    }

    // Retorna a requisição. Usa o catchError() para lidar com erros na API
    return this.http.get<PageMovieResponse>(url, options).pipe(
      catchError( this.handleError<PageMovieResponse>('getMovies', undefined) )
    );
	}

  /**
   * Recupera um filme por ID
   * 
   * @param id    ID do registro
   */
	getMovieById(id: string|number): Observable<MovieResponse> {

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
      catchError( this.handleError<MovieResponse>('getMovieById', undefined) )
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
      catchError( this.handleError<YearsWithMultipleWinnersResponse>('getYearsWithMultipleWinners', undefined) )
    );
	}

  /**
   * Pega os filmes vencedores por ano
   * 
   * @param year    Ano do filme
   */
	getWinnersByYear(year: string|number): Observable<MovieResponse[]> {

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
      catchError( this.handleError<MovieResponse[]>('getWinnersByYear', []) )
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
      catchError( this.handleError<StudiosWithWinCountResponse>('getStudiosWithWinCount', undefined) )
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
      catchError( this.handleError<ProducerWinIntervalResponse>('getMaxMinWinIntervalForProducers', undefined) )
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
