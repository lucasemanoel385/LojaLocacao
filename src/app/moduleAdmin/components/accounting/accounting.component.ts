import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingComponent {

}
