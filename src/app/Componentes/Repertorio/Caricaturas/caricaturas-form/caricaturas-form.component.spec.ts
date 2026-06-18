import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricaturasFormComponent } from './caricaturas-form.component';

describe('CaricaturasFormComponent', () => {
  let component: CaricaturasFormComponent;
  let fixture: ComponentFixture<CaricaturasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaricaturasFormComponent]
    });
    fixture = TestBed.createComponent(CaricaturasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
