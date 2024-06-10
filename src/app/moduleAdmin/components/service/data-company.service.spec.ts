import { TestBed } from '@angular/core/testing';

import { DataCompanyService } from './data-company.service';

describe('DataCompanyService', () => {
  let service: DataCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
