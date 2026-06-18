import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraCargaComponent } from './bitacora-carga.component';

describe('BitacoraCargaComponent', () => {
  let component: BitacoraCargaComponent;
  let fixture: ComponentFixture<BitacoraCargaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BitacoraCargaComponent]
    });
    fixture = TestBed.createComponent(BitacoraCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
