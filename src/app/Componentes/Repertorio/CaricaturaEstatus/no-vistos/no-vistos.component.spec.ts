import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoVistosComponent } from './no-vistos.component';

describe('NoVistosComponent', () => {
  let component: NoVistosComponent;
  let fixture: ComponentFixture<NoVistosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoVistosComponent]
    });
    fixture = TestBed.createComponent(NoVistosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
