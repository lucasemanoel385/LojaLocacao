import { TestBed } from '@angular/core/testing';

import { CategoryItemService } from './categoryItem.service';

describe('CategoryItemService', () => {
  let service: CategoryItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
