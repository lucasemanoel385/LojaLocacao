import { Component } from '@angular/core';

import { ItemComponent } from '../../../../moduleItem/components/item/item.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';

@Component({
  selector: 'app-item-register',
  standalone: true,
  imports: [ItemComponent, DefaultLayoutComponent],
  templateUrl: './item-register.component.html',
  styleUrl: './item-register.component.scss'
})
export class ItemRegisterComponent {

}
