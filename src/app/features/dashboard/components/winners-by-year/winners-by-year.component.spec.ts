import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { WinnersByYearComponent } from './winners-by-year.component';
import { By } from '@angular/platform-browser';

describe('WinnersByYearComponent', () => {
  let component: WinnersByYearComponent;
  let fixture: ComponentFixture<WinnersByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WinnersByYearComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnersByYearComponent);
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

  it('deve renderizar as colunas da tabela corretamente', () => {

    // Atualiza o loader na página e detecta as mudanças
    component.isLoading = false;
    fixture.detectChanges();

    // Pega o cabeçalho da tabela
    const headers = fixture.debugElement.queryAll(
      By.css('th')
    );

    // Espera que a quantidade de colunas da tabela seja igual a 6
    expect(headers.length).toBe(3);

    // Espera que as 6 colunas foram renderizadas corretamente
    expect(headers[0].nativeElement.textContent).toContain('ID');
    expect(headers[1].nativeElement.textContent).toContain('Year');
    expect(headers[2].nativeElement.textContent).toContain('Title');
  });
});
