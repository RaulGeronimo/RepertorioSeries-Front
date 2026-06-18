import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaSerieFormComponent } from './temporada-serie-form.component';

describe('TemporadaSerieFormComponent', () => {
  let component: TemporadaSerieFormComponent;
  let fixture: ComponentFixture<TemporadaSerieFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaSerieFormComponent]
    });
    fixture = TestBed.createComponent(TemporadaSerieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
