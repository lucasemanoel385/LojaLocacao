import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractRegisterPageComponent } from './contract-register.component';

describe('ContractBudgetComponent', () => {
  let component: ContractRegisterPageComponent;
  let fixture: ComponentFixture<ContractRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
