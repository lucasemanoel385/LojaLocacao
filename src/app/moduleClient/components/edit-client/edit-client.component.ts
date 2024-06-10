import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormRegisterClientComponent } from '../form-register-client/form-register-client.component';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [FormRegisterClientComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditClientComponent implements OnInit {

  #router = inject(ActivatedRoute);
  idEdit = signal('');

  ngOnInit(): void {
    this.idEdit.set(this.#router.snapshot.params['id'])
   
  }

 



}
