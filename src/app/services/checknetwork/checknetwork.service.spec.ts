import { TestBed } from '@angular/core/testing';

import { ChecknetworkService } from './checknetwork.service';

describe('ChecknetworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecknetworkService = TestBed.get(ChecknetworkService);
    expect(service).toBeTruthy();
  });
});
