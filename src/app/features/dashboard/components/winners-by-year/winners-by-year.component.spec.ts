import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { WinnersByYearComponent } from './winners-by-year.component';

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
});
