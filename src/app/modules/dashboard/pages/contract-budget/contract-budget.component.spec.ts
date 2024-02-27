import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractBudgetPageComponent } from './contract-budget.component';

describe('ContractBudgetComponent', () => {
  let component: ContractBudgetPageComponent;
  let fixture: ComponentFixture<ContractBudgetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractBudgetPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractBudgetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
