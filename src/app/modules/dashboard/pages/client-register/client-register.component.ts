import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormRegisterClientComponent } from '../../../../moduleClient/components/form-register-client/form-register-client.component';
import { DefaultLayoutComponent } from '../../../../componentsTemplate/default-layout/default-layout.component';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [FormRegisterClientComponent, DefaultLayoutComponent],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientRegisterComponent {

}
