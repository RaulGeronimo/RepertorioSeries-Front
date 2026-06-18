import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistosComponent } from './vistos.component';

describe('VistosComponent', () => {
  let component: VistosComponent;
  let fixture: ComponentFixture<VistosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistosComponent]
    });
    fixture = TestBed.createComponent(VistosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
