import { TestBed } from '@angular/core/testing';

import { TemporadasSerieService } from './temporadas-serie.service';

describe('TemporadasSerieService', () => {
  let service: TemporadasSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporadasSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
