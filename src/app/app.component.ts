import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormRegisterClientComponent } from './modules/client/components/form-register-client/form-register-client.component';
import { NgxMaskDirective } from 'ngx-mask';
import { ListItemComponent } from './modules/client/components/list-item/list-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormRegisterClientComponent, ListItemComponent], 
  template: `<router-outlet/>
  <!--<app-form-register-client/><router-outlet></router-outlet>-->
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
