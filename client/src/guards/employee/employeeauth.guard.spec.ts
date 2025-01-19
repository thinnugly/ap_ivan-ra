import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeauthGuard } from './employeeauth.guard';

describe('employeeauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
