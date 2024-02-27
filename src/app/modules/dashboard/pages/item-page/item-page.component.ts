import { Component } from '@angular/core';
import { ItemComponent } from '../../../client/components/item/item.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ListItemComponent } from '../../../client/components/list-item/list-item.component';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [ItemComponent, DashboardComponent, ListItemComponent],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.scss'
})
export class ItemPageComponent {

}
