import { ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { ClientService } from '../../service/client.service';
import { NgxMaskDirective } from 'ngx-mask';
import { CpfCnpjPipe } from '../pipes/cpf-cnpj.pipe';
import { PhonePipe } from '../pipes/phone.pipe';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { PagiantorList } from '../../../componentsTemplate/paginator/paginator-list/paginator-list.component';


@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [RouterLink, ListTableLayoutComponent, CpfCnpjPipe, PhonePipe, PagiantorList],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListClientComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    this.getListClient() === null ? this.#serviceClient.httpGetClient().subscribe() : null;
  }
  
  // Get api Service
  #serviceClient = inject(ClientService);
  public getListClient = this.#serviceClient.getListClient;
  public getListClientPageable = this.#serviceClient.getListClientPageable;
  public getDeleteMsgError = this.#serviceClient.getClientDeleteError;


  public idClient!: number;
  
  // Filter client
  searchClient = signal('');
  public filterClient(search: any) {
    this.searchClient.set(search);
    this.#serviceClient.httpGetClient(search).subscribe();
  }

  public deleteClient(modalClient: HTMLDialogElement) {

    this.#serviceClient.httpDeleteClientId(this.idClient).pipe(
      concatMap( () => this.#serviceClient.httpGetClient())
      ).subscribe(res => modalClient.close());

      setTimeout(() => {
        this.getDeleteMsgError.set(null);
      }, 5000)
  
  }

  // paginator
  numberPage = signal(0);
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    this.#serviceClient.httpGetClient(this.searchClient() ,pageNumber).subscribe();
  }

  ngOnDestroy(): void {
    this.searchClient() != '' || this.numberPage() != 0 ? this.#serviceClient.httpGetClient().subscribe() : null;
  }

}
