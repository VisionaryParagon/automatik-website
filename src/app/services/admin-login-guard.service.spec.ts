import { TestBed, inject } from '@angular/core/testing';

import { AdminLoginGuardService } from './admin-login-guard.service';

describe('AdminLoginGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLoginGuardService]
    });
  });

  it('should be created', inject([AdminLoginGuardService], (service: AdminLoginGuardService) => {
    expect(service).toBeTruthy();
  }));
});
