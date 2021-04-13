import { TestBed } from '@angular/core/testing';

import { LoadAdminGuard } from './load-admin.guard';

describe('LoadAdminGuard', () => {
  let guard: LoadAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
