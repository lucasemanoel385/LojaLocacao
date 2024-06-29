import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContractServiceService } from '../../service/contract-service.service';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { CpfCnpjPipe } from "../../../moduleClient/components/pipes/cpf-cnpj.pipe";
import { PhonePipe } from "../../../moduleClient/components/pipes/phone.pipe";
import { formatDate } from '@angular/common';
import { FormatDatePipe } from "../../../moduleClient/components/pipes/format-date.pipe";
import { concat, concatMap } from 'rxjs';
import { PagiantorList } from '../../../componentsTemplate/paginator/paginator-list/paginator-list.component';



@Component({
    selector: 'app-list-contract',
    standalone: true,
    templateUrl: './list-contract.component.html',
    styleUrl: './list-contract.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ListTableLayoutComponent, CpfCnpjPipe, PhonePipe, 
      FormatDatePipe, PagiantorList]
})
export class ListContractComponent implements OnInit, OnDestroy {

  #apiServiceContract = inject(ContractServiceService);

  public getListContract$ = this.#apiServiceContract.getListContract;
  public getListContractPage = this.#apiServiceContract.getListContractPage;

  ngOnInit(): void {
    
    console.log(formatDate("2024,5,25", 'dd-MM-yyyy', 'pt-BR'));
    if(this.getListContract$() === null) {
      console.log("sem cache")
      this.#apiServiceContract.httpGetContracts().subscribe();
    }
    
  }

  idContractDelete!: number;
  indexRowTable!: number;

  deleteContract(modal: HTMLDialogElement) {
    this.#apiServiceContract.httpDeleteContractId(this.idContractDelete).pipe(
    ).subscribe(() => modal.close());
    
    this.getListContract$()?.splice(this.indexRowTable,1)
  }

  
  searchContract = signal('');

  filterContract(search: string) {
    this.searchContract.set(search);
    this.#apiServiceContract.httpGetContracts(search, 0).subscribe();

  }

  numberPage = signal(0);

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    this.#apiServiceContract.httpGetContracts(this.searchContract(), pageNumber).subscribe();
  }

  ngOnDestroy(): void {
    if(this.searchContract() != '' || this.numberPage() != 0) {
      this.#apiServiceContract.httpGetContracts().subscribe();
    }
  }


}
