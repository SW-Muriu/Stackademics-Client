import { TestBed } from '@angular/core/testing';

import { LocationChangeService } from './location-change.service';

describe('LocationChangeService', () => {
  let service: LocationChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
