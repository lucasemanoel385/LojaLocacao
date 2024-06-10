import { Component } from '@angular/core';
import { ItemComponent } from '../../../../moduleItem/components/item/item.component';

import { ListItemComponent } from '../../../../moduleItem/components/list-item/list-item.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [DefaultLayoutComponent, ListItemComponent],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.scss'
})
export class ItemPageComponent {

}
