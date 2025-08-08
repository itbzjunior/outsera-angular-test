import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MultipleWinnersComponent } from './multiple-winners.component';

describe('MultipleWinnersComponent', () => {
  let component: MultipleWinnersComponent;
  let fixture: ComponentFixture<MultipleWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MultipleWinnersComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente principal', () => {
    expect(component).toBeTruthy();
  });
});
