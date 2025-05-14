import { TestBed } from '@angular/core/testing';

import { CheckItemService } from './check-item.service';

describe('CheckItemService', () => {
  let service: CheckItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
