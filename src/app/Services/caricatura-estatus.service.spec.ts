import { TestBed } from '@angular/core/testing';

import { CaricaturaEstatusService } from './caricatura-estatus.service';

describe('CaricaturaEstatusService', () => {
  let service: CaricaturaEstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaricaturaEstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
