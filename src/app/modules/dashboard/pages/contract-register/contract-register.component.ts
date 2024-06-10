import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContractBudgetComponent } from '../../../contract-budget/components/contract-budget/contract-budget.component';
import { ListContractComponent } from '../../../../moduleContract/components/list-contract/list-contract.component';
import { TableContractComponent } from '../../../../moduleContract/components/table-contract/table-contract.component';
import { ContractDetailsComponent } from '../../../../moduleContract/components/contract-details/contract-details.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';
import { RegisterContractComponent } from '../../../../moduleContract/components/register-contract/register-contract.component';

@Component({
  selector: 'app-contract-register-page',
  standalone: true,
  imports: [DefaultLayoutComponent, RegisterContractComponent],
  templateUrl: './contract-register.component.html',
  styleUrl: './contract-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractRegisterPageComponent {

}
