import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaricaturasListComponent } from './caricaturas-list.component';

describe('CaricaturasListComponent', () => {
  let component: CaricaturasListComponent;
  let fixture: ComponentFixture<CaricaturasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaricaturasListComponent]
    });
    fixture = TestBed.createComponent(CaricaturasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
