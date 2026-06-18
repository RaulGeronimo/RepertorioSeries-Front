import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarSerieComponent } from './buscar-serie.component';

describe('BuscarSerieComponent', () => {
  let component: BuscarSerieComponent;
  let fixture: ComponentFixture<BuscarSerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarSerieComponent]
    });
    fixture = TestBed.createComponent(BuscarSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
