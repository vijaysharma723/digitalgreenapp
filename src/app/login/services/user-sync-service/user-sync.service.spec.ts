import { TestBed } from '@angular/core/testing';

import { UserSyncService } from './user-sync.service';

describe('UserSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSyncService = TestBed.get(UserSyncService);
    expect(service).toBeTruthy();
  });
});
