import { TestBed } from '@angular/core/testing';

import { TemporadasCaricaturaService } from './temporadas-caricatura.service';

describe('TemporadasCaricaturaService', () => {
  let service: TemporadasCaricaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporadasCaricaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
