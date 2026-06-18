import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraErrorComponent } from './bitacora-error.component';

describe('BitacoraErrorComponent', () => {
  let component: BitacoraErrorComponent;
  let fixture: ComponentFixture<BitacoraErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BitacoraErrorComponent]
    });
    fixture = TestBed.createComponent(BitacoraErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
