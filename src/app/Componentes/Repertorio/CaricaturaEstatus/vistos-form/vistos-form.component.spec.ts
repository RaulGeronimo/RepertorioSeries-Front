import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistosFormComponent } from './vistos-form.component';

describe('VistosFormComponent', () => {
  let component: VistosFormComponent;
  let fixture: ComponentFixture<VistosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistosFormComponent]
    });
    fixture = TestBed.createComponent(VistosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
