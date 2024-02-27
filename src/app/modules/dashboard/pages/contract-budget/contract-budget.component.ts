import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ContractBudgetComponent } from '../../../contract-budget/components/contract-budget/contract-budget.component';

@Component({
  selector: 'app-contract-budget-page',
  standalone: true,
  imports: [DashboardComponent, ContractBudgetComponent],
  templateUrl: './contract-budget.component.html',
  styleUrl: './contract-budget.component.scss'
})
export class ContractBudgetPageComponent {

}
