import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBudgetComponent } from './contract-budget.component';

describe('ContractBudgetComponent', () => {
  let component: ContractBudgetComponent;
  let fixture: ComponentFixture<ContractBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractBudgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
