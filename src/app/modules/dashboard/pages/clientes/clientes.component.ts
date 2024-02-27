import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterLink } from '@angular/router';
import { FormRegisterClientComponent } from '../../../client/components/form-register-client/form-register-client.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [DashboardComponent, FormRegisterClientComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

}
