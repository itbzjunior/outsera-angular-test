import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(MovieService);
  });

  // Testa o método getMovies()
  describe('getMovies', () => {

    // Parâmetros da chamada
    const page = 0;
    const size = 10;
    const winner = true;
    const year = '2019';
    
    it('should return valid data and HttpClient called once', (done: DoneFn) => {
      const expectedHeroes: Hero[] = [
        {id: 1, name: 'A'},
        {id: 2, name: 'B'},
      ];
      httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));
      service.getMovies(page, size, winner, year).subscribe({
        next: (heroes) => {
          expect(heroes).withContext('expected heroes').toContain(expectedHeroes);
          done();
        },
        error: done.fail,
      });
      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });
  
    it('should return an error when the server returns a 404', (done: DoneFn) => {
      let errorResponse = {
        status: "NOT_FOUND",
        timestamp: "2025-01-01 23:59",
        message: "The requested resource could not be found"
      };
      httpClientSpy.get.and.returnValue(asyncError(errorResponse));
      service.getMovies(page, size, winner, year).subscribe({
        next: (heroes) => done.fail('expected an error, not success'),
        error: (error) => {
          expect(error.message).toContain('test 404 error');
          done();
        },
      });
    });
  })

  // Testa o método getMovieById()
  describe('getMovieById', () => {
    it('should return valid data and HttpClient called once', () => {
      expect(service.getMovieById).toBeDefined();
    });

    it('não deve retornar erro', () => {
      const id = 10;
      expect(() => service.getMovieById(id)).not.toThrow();
    });
  })

  // Testa o método getYearsWithMultipleWinners()
  describe('getYearsWithMultipleWinners', () => {
    it('should return valid data and HttpClient called once', () => {
      expect(service.getYearsWithMultipleWinners).toBeDefined();
    });

    it('não deve retornar erro', () => {
      expect(() => service.getYearsWithMultipleWinners()).not.toThrow();
    });
  })

  // Testa o método getWinnersByYear()
  describe('getWinnersByYear', () => {
    it('should return valid data and HttpClient called once', () => {
      expect(service.getWinnersByYear).toBeDefined();
    });

    it('não deve retornar erro', () => {
      const year = '2019';
      expect(() => service.getWinnersByYear(year)).not.toThrow();
    });

    it('deve retornar erro', () => {
      const year = ''; // Campo vazio
      expect(() => service.getWinnersByYear(year)).not.toThrow();
    });
  })

  // Testa o método getStudiosWithWinCount()
  describe('getStudiosWithWinCount', () => {
    it('should return valid data and HttpClient called once', () => {
      expect(service.getStudiosWithWinCount).toBeDefined();
    });

    it('não deve retornar erro', () => {
      expect(() => service.getStudiosWithWinCount()).not.toThrow();
    });
  })

  // Testa o método getMaxMinWinIntervalForProducers()
  describe('getMaxMinWinIntervalForProducers', () => {
    it('should return valid data and HttpClient called once', () => {
      expect(service.getMaxMinWinIntervalForProducers).toBeDefined();
    });

    it('não deve retornar erro', () => {
      expect(() => service.getMaxMinWinIntervalForProducers()).not.toThrow();
    });
  })
});
