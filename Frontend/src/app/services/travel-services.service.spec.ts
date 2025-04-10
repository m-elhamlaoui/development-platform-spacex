import { TestBed } from '@angular/core/testing';

import { TravelServicesService } from './travel-services.service';

describe('TravelServicesService', () => {
  let service: TravelServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
