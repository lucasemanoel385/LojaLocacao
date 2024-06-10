import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompanyDataComponent } from '../company-data/company-data.component';
import { BudgetComponent } from '../budget/budget.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContractComponent } from '../contract/contract.component';
import { AccountingComponent } from '../accounting/accounting.component';

@Component({
  selector: 'app-template-admin',
  standalone: true,
  imports: [AccountingComponent ,CompanyDataComponent, BudgetComponent, RouterLinkActive, RouterLink, ContractComponent],
  templateUrl: './template-admin.component.html',
  styleUrl: './template-admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateAdminComponent {

}
