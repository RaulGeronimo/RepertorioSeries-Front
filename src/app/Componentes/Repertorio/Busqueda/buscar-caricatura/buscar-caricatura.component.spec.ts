import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCaricaturaComponent } from './buscar-caricatura.component';

describe('BuscarCaricaturaComponent', () => {
  let component: BuscarCaricaturaComponent;
  let fixture: ComponentFixture<BuscarCaricaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarCaricaturaComponent]
    });
    fixture = TestBed.createComponent(BuscarCaricaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
