import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { BackHistoryComponent } from '../../../../componentsTemplate/back-history/back-history.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClientList } from '../../../../moduleClient/interface/clientList.interface';
import { ContractServiceService } from '../../../service/contract-service.service';
import { ClientService } from '../../../../moduleClient/service/client.service';
import { CpfCnpjPipe } from '../../../../moduleClient/components/pipes/cpf-cnpj.pipe';
import { ContractId } from '../../../interface/contractId.interface';
import { FormatDatePipe } from '../../../../moduleClient/components/pipes/format-date.pipe';

@Component({
  selector: 'app-header-contract',
  standalone: true,
  imports: [BackHistoryComponent, CpfCnpjPipe, ReactiveFormsModule],
  templateUrl: './header-contract.component.html',
  styleUrl: './header-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContractComponent implements OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'].currentValue) {
      this.editHeader(this.contractId as ContractId);
    }

}

  #apiServiceClient = inject(ClientService);
  #apiServiceContract = inject(ContractServiceService);
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  @Input() headerForm!: FormGroup;
  @Input() contractId!: ContractId | null;
  @Output() client = new EventEmitter<number>;


  listClients = signal<ClientList[] | null>(null);

  editHeader(contract: ContractId) {

    this.headerForm.patchValue({
      client: new CpfCnpjPipe().transform(contract.client.cpfCnpj) + ' - ' + contract.client.nameReason,
      dateOf: new FormatDatePipe().transformInputDate(contract.dateOf),
      dateUntil: new FormatDatePipe().transformInputDate(contract.dateUntil),
      discount: contract.discount,
      seller: contract.seller,
    })

  }

  filterClient(e: Event) {
    
    const target = e.target as HTMLInputElement;
    const valueInput = target.value.toUpperCase().replaceAll('.', '').replace('-', '');

    if(valueInput.length >= 4) {
      this.#apiServiceClient.httpGetClientFilter(valueInput).subscribe((res) => this.listClients.set(res.content));
    } else {
      this.listClients.set(null);
    }
  }

  listClient(e: Event) {
    const ul: any = document.getElementById('filterCpf');
    if(e) {
      ul.style.display = 'list-item';
      
    }
  }

  removeListClient(e: Event) {
    const ul: any = document.getElementById('filterCpf');
    setTimeout(() => {
      if(e) {
        ul.style.display = 'none';
        this.listClients.set(null);
      }
    }, 200)
  }

  public idClient!: number;

  setValueClient(id: number, cpf: string, name: string) {
    this.headerForm.patchValue({
      client: new CpfCnpjPipe().transform(cpf) + ' - ' + name,
    })
  this.client.emit(id);
    this.idClient = id;
  }

}
