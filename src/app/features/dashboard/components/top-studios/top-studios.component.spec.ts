import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TopStudiosComponent } from './top-studios.component';

describe('TopStudiosComponent', () => {
  let component: TopStudiosComponent;
  let fixture: ComponentFixture<TopStudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopStudiosComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente principal', () => {
    expect(component).toBeTruthy();
  });
});
