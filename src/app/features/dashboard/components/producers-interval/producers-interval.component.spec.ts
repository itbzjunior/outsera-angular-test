import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ProducersIntervalComponent } from './producers-interval.component';
import { By } from '@angular/platform-browser';

describe('ProducersIntervalComponent', () => {
  let component: ProducersIntervalComponent;
  let fixture: ComponentFixture<ProducersIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProducersIntervalComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente principal', () => {
    expect(component).toBeTruthy();
  });

  it('deve mostrar o "loader" antes de puxar os dados', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('.loader')
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

  it('deve renderizar as colunas da tabela mínima corretamente', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = false;
    fixture.detectChanges();

    // Pega o cabeçalho da tabela
    const headers = fixture.debugElement.queryAll(
      By.css('.table-min th')
    );

    // Espera que a quantidade de colunas da tabela seja igual a 6
    expect(headers.length).toBe(4);

    // Espera que as 6 colunas foram renderizadas corretamente
    expect(headers[0].nativeElement.textContent).toContain('Producer');
    expect(headers[1].nativeElement.textContent).toContain('Interval');
    expect(headers[2].nativeElement.textContent).toContain('Previous Year');
    expect(headers[3].nativeElement.textContent).toContain('Following Year');
  });

  it('deve renderizar as colunas da tabela máxima corretamente', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = false;
    fixture.detectChanges();

    // Pega o cabeçalho da tabela
    const headers = fixture.debugElement.queryAll(
      By.css('.table-max th')
    );

    // Espera que a quantidade de colunas da tabela seja igual a 6
    expect(headers.length).toBe(4);

    // Espera que as 6 colunas foram renderizadas corretamente
    expect(headers[0].nativeElement.textContent).toContain('Producer');
    expect(headers[1].nativeElement.textContent).toContain('Interval');
    expect(headers[2].nativeElement.textContent).toContain('Previous Year');
    expect(headers[3].nativeElement.textContent).toContain('Following Year');
  });
});
