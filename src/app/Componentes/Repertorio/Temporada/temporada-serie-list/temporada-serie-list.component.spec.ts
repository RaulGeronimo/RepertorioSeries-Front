import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaSerieListComponent } from './temporada-serie-list.component';

describe('TemporadaSerieListComponent', () => {
  let component: TemporadaSerieListComponent;
  let fixture: ComponentFixture<TemporadaSerieListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaSerieListComponent]
    });
    fixture = TestBed.createComponent(TemporadaSerieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
