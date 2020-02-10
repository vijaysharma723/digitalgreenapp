import { TestBed } from '@angular/core/testing';

import { CheckStatusService } from './check-status.service';

describe('CheckStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckStatusService = TestBed.get(CheckStatusService);
    expect(service).toBeTruthy();
  });
});
