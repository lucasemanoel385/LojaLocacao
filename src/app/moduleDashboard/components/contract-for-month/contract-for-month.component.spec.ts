import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractForMonthComponent } from './contract-for-month.component';

describe('ContractForMonthComponent', () => {
  let component: ContractForMonthComponent;
  let fixture: ComponentFixture<ContractForMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractForMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractForMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
