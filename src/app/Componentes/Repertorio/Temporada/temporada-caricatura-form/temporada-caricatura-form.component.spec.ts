import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaCaricaturaFormComponent } from './temporada-caricatura-form.component';

describe('TemporadaCaricaturaFormComponent', () => {
  let component: TemporadaCaricaturaFormComponent;
  let fixture: ComponentFixture<TemporadaCaricaturaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaCaricaturaFormComponent]
    });
    fixture = TestBed.createComponent(TemporadaCaricaturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
