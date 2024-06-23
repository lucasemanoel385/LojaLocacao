import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContractServiceService } from '../../service/contract-service.service';
import { ListTableLayoutComponent } from '../../../componentsTemplate/list-table-layout/list-table-layout.component';
import { CpfCnpjPipe } from "../../../moduleClient/components/pipes/cpf-cnpj.pipe";
import { PhonePipe } from "../../../moduleClient/components/pipes/phone.pipe";
import { formatDate } from '@angular/common';
import { FormatDatePipe } from "../../../moduleClient/components/pipes/format-date.pipe";
import { concat, concatMap } from 'rxjs';



@Component({
    selector: 'app-list-contract',
    standalone: true,
    templateUrl: './list-contract.component.html',
    styleUrl: './list-contract.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, ListTableLayoutComponent, CpfCnpjPipe, PhonePipe, FormatDatePipe]
})
export class ListContractComponent implements OnInit {

  

  #apiServiceContract = inject(ContractServiceService);

  public getListContract$ = this.#apiServiceContract.getListContract;

  ngOnInit(): void {
    
    console.log(formatDate("2024,5,25", 'dd-MM-yyyy', 'pt-BR'));
    this.#apiServiceContract.httpGetContracts().subscribe();
    
  }

  idContractDelete!: number;
  indexRowTable!: number;

  deleteContract(modal: HTMLDialogElement) {
    this.#apiServiceContract.httpDeleteContractId(this.idContractDelete).pipe(
    ).subscribe(() => modal.close());
    
    this.getListContract$()?.splice(this.indexRowTable,1)
  }

  searchContract(search: string) {

    this.#apiServiceContract.httpGetContracts(search).subscribe();

  }


}
