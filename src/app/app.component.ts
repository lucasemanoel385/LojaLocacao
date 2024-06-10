import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormRegisterClientComponent } from './moduleClient/components/form-register-client/form-register-client.component';
import { NgxMaskDirective } from 'ngx-mask';
import { ListItemComponent } from './moduleItem/components/list-item/list-item.component';
import { PageSPAComponent } from './pages/page-spa/page-spa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormRegisterClientComponent, ListItemComponent, PageSPAComponent], 
  template: `
  <!--<app-page-spa/>-->
  <router-outlet/>
  <!--<app-form-register-client/><router-outlet></router-outlet>-->
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
