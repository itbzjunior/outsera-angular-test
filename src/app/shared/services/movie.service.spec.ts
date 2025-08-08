import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MovieService } from './movie.service';
import { MovieResponse, PageMovieQueryParams, PageMovieResponse, ProducerWinIntervalResponse, StudiosWithWinCountResponse, YearsWithMultipleWinnersResponse } from '@shared/models/movie';

describe('MovieService', () => {

  let httpTestingController: HttpTestingController;
  let service: MovieService;

  // Antes de cada teste
  beforeEach(() => {

    // Configura o módulo de testes HTTP
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    // Injeta o controller de testes
    httpTestingController = TestBed.inject(HttpTestingController);

    // Injeta o serviço principal
    service = TestBed.inject(MovieService);
  });

  // Após cada teste
  afterEach(() => {
    httpTestingController.verify();
  });

  // Testa o método getMovies()
  describe('getMovies', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      // Query params
      let params: PageMovieQueryParams = {
        page: 0,
        size: 1,
      }

      // Chama o serviço
      service.getMovies(params).subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies?page=${params.page}&size=${params.size}`
      });

      // Espera que o metodo seja GET
      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: PageMovieResponse = {
        "content": [{
          "id": 1,
          "year": 1980,
          "title": "Can't Stop the Music",
          "studios": ["Associated Film Distribution"],
          "producers": ["Allan Carr"],
          "winner": true
        }],
        "pageable": {
          "pageNumber": 0,
          "pageSize": 1,
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 206,
        "totalElements": 206,
        "last": false,
        "numberOfElements": 1,
        "size": 1,
        "number": 0,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "first": true,
        "empty": false
      };

      // Query params
      let params: PageMovieQueryParams = {
        page: 0,
        size: 1,
      }

      // Chama o serviço
      service.getMovies(params).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData); // SE possui o atributo "content" no retorno
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies?page=${params.page}&size=${params.size}`
      });
      
      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });

    it('deve retornar os dados esperados filtrados por ano', (done) => {
      // Define o resultado esperado
      const expectedData: PageMovieResponse = {
        "content": [{
          "id": 202,
          "year": 2019,
          "title": "Cats",
          "studios": ["Universal Pictures"],
          "producers": ["Debra Hayward", "Eric Fellner", "Tim Bevan", "and Tom Hooper"],
          "winner": true
        }],
        "pageable": {
          "pageNumber": 0,
          "pageSize": 1,
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 5,
        "totalElements": 5,
        "last": false,
        "numberOfElements": 1,
        "size": 1,
        "number": 0,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "first": true,
        "empty": false
      };

      // Query params
      let params: PageMovieQueryParams = {
        page: 0,
        size: 1,
        year: 2019
      }

      // Chama o serviço
      service.getMovies(params).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies?page=0&size=1&year=2019`
      });

      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });

    it('deve retornar os dados filtrando apenas vencedores', (done) => {
      // Define o resultado esperado
      const expectedData: PageMovieResponse = {
        "content": [{
          "id": 1,
          "year": 1980,
          "title": "Can't Stop the Music",
          "studios": ["Associated Film Distribution"],
          "producers": ["Allan Carr"],
          "winner": true
        }, {
          "id": 11,
          "year": 1981,
          "title": "Mommie Dearest",
          "studios": ["Paramount Pictures"],
          "producers": ["Frank Yablans"],
          "winner": true
        }, {
          "id": 16,
          "year": 1982,
          "title": "Inchon",
          "studios": ["MGM"],
          "producers": ["Mitsuharu Ishii"],
          "winner": true
        }, {
          "id": 21,
          "year": 1983,
          "title": "The Lonely Lady",
          "studios": ["Universal Studios"],
          "producers": ["Robert R. Weston"],
          "winner": true
        }, {
          "id": 26,
          "year": 1984,
          "title": "Bolero",
          "studios": ["Cannon Films"],
          "producers": ["Bo Derek"],
          "winner": true
        }],
        "pageable": {
          "pageNumber": 0,
          "pageSize": 5,
          "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
          },
          "offset": 0,
          "paged": true,
          "unpaged": false
        },
        "totalPages": 9,
        "totalElements": 42,
        "last": false,
        "numberOfElements": 5,
        "size": 5,
        "number": 0,
        "sort": {
          "sorted": false,
          "unsorted": true,
          "empty": true
        },
        "first": true,
        "empty": false
      };

      // Query params
      let params: PageMovieQueryParams = {
        page: 0,
        size: 5,
        winner: true
      }

      // Chama o serviço
      service.getMovies(params).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies?page=0&size=5&winner=true`
      });

      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })

  // Testa o método getMovieById()
  describe('getMovieById', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      const id = 1;

      // Chama o serviço
      service.getMovieById(id).subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/${id}`
      });

      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: MovieResponse = {
        "id": 1,
        "year": 1980,
        "title": "Can't Stop the Music",
        "studios": ["Associated Film Distribution"],
        "producers": ["Allan Carr"],
        "winner": true
      };

      const id = 1;

      // Chama o serviço
      service.getMovieById(id).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/${id}`
      });

      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })

  // Testa o método getYearsWithMultipleWinners()
  describe('getYearsWithMultipleWinners', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      // Chama o serviço
      service.getYearsWithMultipleWinners().subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners`
      });

      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: YearsWithMultipleWinnersResponse = {
        "years": [{
          "year": 1986,
          "winnerCount": 2
        }, {
          "year": 1990,
          "winnerCount": 2
        }, {
          "year": 2015,
          "winnerCount": 2
        }]
      };

      // Chama o serviço
      service.getYearsWithMultipleWinners().subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData); // Se possui o atributo "years" na resposta
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners`
      });
      
      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })

  // Testa o método getWinnersByYear()
  describe('getWinnersByYear', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      const year = 2019;

      // Chama o serviço
      service.getWinnersByYear(year).subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/winnersByYear?year=${year}`
      });

      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: MovieResponse[] = [{
        "id": 202,
        "year": 2019,
        "title": "Cats",
        "studios": ["Universal Pictures"],
        "producers": ["Debra Hayward", "Eric Fellner", "Tim Bevan", "and Tom Hooper"],
        "winner": true
      }];

      const year = 2019;

      // Chama o serviço
      service.getWinnersByYear(year).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData); // Se possui o atributo "title" na resposta
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/winnersByYear?year=${year}`
      });
      
      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });

    it('deve retornar os dados esperados filtrados por ano', (done) => {
      // Define o resultado esperado
      const expectedData: MovieResponse[] = [{
        "id": 202,
        "year": 2019,
        "title": "Cats",
        "studios": ["Universal Pictures"],
        "producers": ["Debra Hayward", "Eric Fellner", "Tim Bevan", "and Tom Hooper"],
        "winner": true
      }];

      // Query params
      const year = 2019;

      // Chama o serviço
      service.getWinnersByYear(year).subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData);
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/winnersByYear?year=${year}`
      });

      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })

  // Testa o método getStudiosWithWinCount()
  describe('getStudiosWithWinCount', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      // Chama o serviço
      service.getStudiosWithWinCount().subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/studiosWithWinCount`
      });

      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: StudiosWithWinCountResponse = {
        "studios": [{
          "name": "Columbia Pictures",
          "winCount": 7
        }, {
          "name": "Paramount Pictures",
          "winCount": 6
        }, {
          "name": "Warner Bros.",
          "winCount": 5
        }, {
          "name": "20th Century Fox",
          "winCount": 4
        }, {
          "name": "MGM",
          "winCount": 3
        }, {
          "name": "Hollywood Pictures",
          "winCount": 2
        }, {
          "name": "Universal Pictures",
          "winCount": 2
        }, {
          "name": "Universal Studios",
          "winCount": 2
        }, {
          "name": "Associated Film Distribution",
          "winCount": 1
        }, {
          "name": "C2 Pictures",
          "winCount": 1
        }, {
          "name": "Cannon Films",
          "winCount": 1
        }, {
          "name": "Castle Rock Entertainment",
          "winCount": 1
        }, {
          "name": "DreamWorks",
          "winCount": 1
        }, {
          "name": "First Look Pictures",
          "winCount": 1
        }, {
          "name": "Focus Features",
          "winCount": 1
        }, {
          "name": "Franchise Pictures",
          "winCount": 1
        }, {
          "name": "Hasbro",
          "winCount": 1
        }, {
          "name": "Nickelodeon Movies",
          "winCount": 1
        }, {
          "name": "Quality Flix",
          "winCount": 1
        }, {
          "name": "Relativity Media",
          "winCount": 1
        }, {
          "name": "Revolution Studios",
          "winCount": 1
        }, {
          "name": "Samuel Goldwyn Films",
          "winCount": 1
        }, {
          "name": "Screen Gems",
          "winCount": 1
        }, {
          "name": "Summit Entertainment",
          "winCount": 1
        }, {
          "name": "Touchstone Pictures",
          "winCount": 1
        }, {
          "name": "TriStar Pictures",
          "winCount": 1
        }, {
          "name": "Triumph Releasing",
          "winCount": 1
        }, {
          "name": "United Artists",
          "winCount": 1
        }]
      };

      // Chama o serviço
      service.getStudiosWithWinCount().subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData); // Se possui o atributo "studios" na resposta
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/studiosWithWinCount`
      });
      
      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })

  // Testa o método getMaxMinWinIntervalForProducers()
  describe('getMaxMinWinIntervalForProducers', () => {

    it('deve usar o método GET para retornar o resultado', () => {

      // Chama o serviço
      service.getMaxMinWinIntervalForProducers().subscribe();

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers`
      });

      expect(testRequest.request.method).toEqual('GET');
    });

    it('deve retornar os dados esperados', (done: DoneFn) => {

      // Define o resultado esperado
      const expectedData: ProducerWinIntervalResponse = {
        "min": [{
          "producer": "Joel Silver",
          "interval": 1,
          "previousWin": 1990,
          "followingWin": 1991
        }],
        "max": [{
          "producer": "Matthew Vaughn",
          "interval": 13,
          "previousWin": 2002,
          "followingWin": 2015
        }]
      };

      // Chama o serviço
      service.getMaxMinWinIntervalForProducers().subscribe({
        next: (data) => {
          expect(data).toEqual(expectedData); // Se possui o atributo "min" na resposta
          expect(data).toEqual(expectedData); // Se possui o atributo "max" na resposta
          done();
        },
        error: done.fail,
      });

      // Define a chamada de teste
      const testRequest = httpTestingController.expectOne({
        method: 'GET',
        url: `https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers`
      });
      
      // Define a resposta da chamada teste, sem efetivamente chamá-la
      testRequest.flush(expectedData);
    });
  })
});
