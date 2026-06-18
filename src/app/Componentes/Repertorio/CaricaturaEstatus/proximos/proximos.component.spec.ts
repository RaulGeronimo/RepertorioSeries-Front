import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosComponent } from './proximos.component';

describe('ProximosComponent', () => {
  let component: ProximosComponent;
  let fixture: ComponentFixture<ProximosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProximosComponent]
    });
    fixture = TestBed.createComponent(ProximosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
