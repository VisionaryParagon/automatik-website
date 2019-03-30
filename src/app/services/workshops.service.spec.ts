import { TestBed } from '@angular/core/testing';

import { WorkshopsService } from './workshops.service';

describe('WorkshopsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkshopsService = TestBed.get(WorkshopsService);
    expect(service).toBeTruthy();
  });
});
