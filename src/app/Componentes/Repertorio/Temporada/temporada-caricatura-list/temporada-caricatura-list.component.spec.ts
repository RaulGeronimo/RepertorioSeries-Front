import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaCaricaturaListComponent } from './temporada-caricatura-list.component';

describe('TemporadaCaricaturaListComponent', () => {
  let component: TemporadaCaricaturaListComponent;
  let fixture: ComponentFixture<TemporadaCaricaturaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadaCaricaturaListComponent]
    });
    fixture = TestBed.createComponent(TemporadaCaricaturaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
