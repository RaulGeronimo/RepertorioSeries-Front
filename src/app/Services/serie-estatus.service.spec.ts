import { TestBed } from '@angular/core/testing';

import { SerieEstatusService } from './serie-estatus.service';

describe('SerieEstatusService', () => {
  let service: SerieEstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerieEstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
