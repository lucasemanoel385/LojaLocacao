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
  
  #serviceClient = inject(ClientService);

  public getListClient = this.#serviceClient.getListClient;
  public getListClientPageable = this.#serviceClient.getListClientPageable;
  public getDeleteMsgError = this.#serviceClient.getClientDeleteError;

  ngOnInit(): void {
    if(this.getListClient() === null) {
      this.#serviceClient.httpGetClient().subscribe(res => console.log(res));
    }
  }
  
  public idClient!: number;
  indexRowTable!: number;

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

  numberPage = signal(0);

  handlePageEvent(pageNumber: number) {
    this.#serviceClient.httpGetClient(this.searchClient() ,pageNumber).subscribe();
  }

  ngOnDestroy(): void {
    if(this.searchClient() != '' || this.numberPage() != 0) {
      this.#serviceClient.httpGetClient().subscribe();
    }
  }

}
