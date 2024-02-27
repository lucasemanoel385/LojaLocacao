import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ItemComponent } from '../../../client/components/item/item.component';

@Component({
  selector: 'app-item-register',
  standalone: true,
  imports: [DashboardComponent, ItemComponent],
  templateUrl: './item-register.component.html',
  styleUrl: './item-register.component.scss'
})
export class ItemRegisterComponent {

}
