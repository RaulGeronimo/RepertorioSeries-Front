import { TestBed } from '@angular/core/testing';

import { CaricaturaService } from './caricatura.service';

describe('CaricaturaService', () => {
  let service: CaricaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaricaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
