import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableContractComponent } from '../table-contract/table-contract.component';


@Component({
  selector: 'app-register-contract',
  standalone: true,
  imports: [TableContractComponent],
  templateUrl: './register-contract.component.html',
  styleUrl: './register-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContractComponent {

}
