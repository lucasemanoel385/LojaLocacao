import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListContractComponent } from '../../../../moduleContract/components/list-contract/list-contract.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';


@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [ListContractComponent, DefaultLayoutComponent],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractListComponent {

}
