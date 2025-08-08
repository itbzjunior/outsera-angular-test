import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MovieListComponent } from './movie-list.component';
import { By } from '@angular/platform-browser';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieListComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente principal', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar o "loading-shade" antes de puxar os dados', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('.loading-shade')
    );
    expect(loadingElement).toBeTruthy();
  });

  it('deve renderizar a tabela assim que carregar os dados', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = false;
    fixture.detectChanges();

    const table = fixture.debugElement.query(
      By.css('table')
    );
    expect(table).toBeTruthy();
  });

  it('deve renderizar as colunas da tabela corretamente', () => {

    // Pega o cabeçalho da tabela
    const headers = fixture.debugElement.queryAll(
      By.css('th')
    );

    // Espera que a quantidade de colunas da tabela seja igual a 6
    expect(headers.length).toBe(6);

    // Espera que as 6 colunas foram renderizadas corretamente
    expect(headers[0].nativeElement.textContent).toContain('ID');
    expect(headers[1].nativeElement.textContent).toContain('Year');
    expect(headers[2].nativeElement.textContent).toContain('Title');
    expect(headers[3].nativeElement.textContent).toContain('Studios');
    expect(headers[4].nativeElement.textContent).toContain('Producers');
    expect(headers[5].nativeElement.textContent).toContain('Winner');
  });
});
