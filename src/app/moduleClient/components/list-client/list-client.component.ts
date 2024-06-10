import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { ClientService } from '../../service/client.service';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfCnpjPipe } from '../pipes/cpf-cnpj.pipe';
import { PhonePipe } from '../pipes/phone.pipe';
import { concatMap } from 'rxjs/internal/operators/concatMap';


@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [RouterLink, ListTableLayoutComponent, CpfCnpjPipe, PhonePipe],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListClientComponent implements OnInit{
  
  ngOnInit(): void {

    this.#serviceClient.httpGetClient().subscribe();
  }

  #serviceClient = inject(ClientService);

  public getListClient = this.#serviceClient.getListClient;

  public idClient!: number;

  public searchClient(search: any) {
    this.#serviceClient.httpGetClient(search).subscribe();
  }

  public deleteClient(modalClient: HTMLDialogElement) {

    this.#serviceClient.httpDeleteClientId(this.idClient).pipe(
      concatMap( () => this.#serviceClient.httpGetClient())
      ).subscribe();

    modalClient.close();
  }

}
