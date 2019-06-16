import { TestBed, inject } from '@angular/core/testing';

import { IntroGuardService } from './intro-guard.service';

describe('IntroGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroGuardService]
    });
  });

  it('should be created', inject([IntroGuardService], (service: IntroGuardService) => {
    expect(service).toBeTruthy();
  }));
});
