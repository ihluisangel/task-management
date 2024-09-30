import { TestBed } from '@angular/core/testing';

import { UserImplentationService } from './user-implentation.service';

describe('UserImplentationService', () => {
  let service: UserImplentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserImplentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
