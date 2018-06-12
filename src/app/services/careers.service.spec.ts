import { TestBed, inject } from '@angular/core/testing';

import { CareersService } from './careers.service';

describe('CareersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CareersService]
    });
  });

  it('should be created', inject([CareersService], (service: CareersService) => {
    expect(service).toBeTruthy();
  }));
});
