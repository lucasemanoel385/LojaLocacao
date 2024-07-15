import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { TableContractComponent, forbiddenNameValidator } from '../table-contract/table-contract.component';
import { HeaderContractComponent } from '../header-contract/header-contract/header-contract.component';
import { BackHistoryComponent } from '../../../componentsTemplate/back-history/back-history.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodyContractComponent } from '../body-contract/body-contract/body-contract.component';
import { FooterContractComponent } from '../footer-contract/footer-contract/footer-contract.component';
import { Router } from '@angular/router';
import { ContractCreate } from '../../interface/contractCreate.interface';
import { ProductService } from '../../../moduleItem/service/product.service';
import { ClientService } from '../../../moduleClient/service/client.service';
import { ContractServiceService } from '../../service/contract-service.service';
import { concatMap, tap } from 'rxjs';
import { ContractId } from '../../interface/contractId.interface';
import { itensList } from '../../interface/itemsList';
import { ContractEdit } from '../../interface/contractEdit.interface';


@Component({
  selector: 'app-register-contract',
  standalone: true,
  imports: [FooterContractComponent ,BodyContractComponent ,TableContractComponent, HeaderContractComponent, BackHistoryComponent, ReactiveFormsModule],
  templateUrl: './register-contract.component.html',
  styleUrl: './register-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterContractComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'].currentValue) {
      this.switchStatus(this.contractId as ContractId);
    }

    if(changes['buttonCreate'] && changes['buttonCreate'].currentValue) {
      this.buttonFooter.set(changes['buttonCreate'].currentValue);
    }
  }

  switchStatus(contract: ContractId) {
    switch (contract.contractSituation) {
      case "ORCAMENTO":
        this.status.set("ORÇAMENTO");
        break;
      case "RESERVADO":
        this.status.set("RESERVADO");
    }
  }

  @Input() buttonCreate!: string;
  @Input() contractId!: ContractId | null;

  #apiServiceItem = inject(ProductService);
  #apiServiceClient = inject(ClientService);
  #apiServiceContract = inject(ContractServiceService);
  public listaItem$ = this.#apiServiceItem.getAllItemList;
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  clientId!: number;
  
  buttonFooter = signal("Cadastrar contrato");
  status = signal("Novo orçamento");

  public OutPutIdClient(idCLient: number) {
    this.clientId = idCLient;
  }

  #fb = inject(FormBuilder);

  public contractForm = this.#fb.group({
      client: [''],
      dateOf: [''],
      dateUntil: [],
      discount: [0],
      seller : [''],
      items: this.#fb.array([], Validators.required),
      observation: [''],
      annotations: ['']
  });

  addItens() {
    const addNewItem = this.#fb.group({
      id: [, Validators.required],
      name: [, Validators.required],
      amount: [, [forbiddenNameValidator(/-/i)]],
      value: [],
      total: []
      
    })
      return (this.contractForm.get('items') as FormArray).push(addNewItem);
  }

  #router = inject(Router);

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.contractForm.get('items') as FormArray).controls as FormGroup[];
  }

  public submit() {
    console.log(this.contractForm.value)
    var listItens: itensList[] = [];

    this.items.forEach((i) => {
      let list: itensList = {
        id: i.get('id')?.value,
        amount: i.get('amount')?.value,
        total: i.get('total')?.value
      }
      listItens.push(list);
      
     })
    if (this.contractId) {

      const contract: ContractEdit = {
        contractId: Number(this.contractId.id),
        clientId: this.contractId.client.id,
        dateOf: this.contractForm.get('dateOf')?.value,
        dateUntil: this.contractForm.get('dateUntil')?.value,
        discount: this.contractForm.get('discount')?.value as number,
        items : listItens,
        seller: this.contractForm.get('seller')?.value as string,
        observation: this.contractForm.get('observation')?.value as string,
        annotations: this.contractForm.get('annotations')?.value as string,
      }

      this.#apiServiceContract.httpEditContract(contract).pipe(
        concatMap(() => this.#apiServiceContract.httpGetContracts())
      ).subscribe();

      setTimeout(() => {
        this.getCreateContractError.set(null);
        this.getContractMsgSucess.set(null);
      }, 5000)
    } else {
      const contract: ContractCreate = {
        client: this.clientId,
        dateOf: this.contractForm.get('dateOf')?.value,
        dateUntil: this.contractForm.get('dateUntil')?.value,
        discount: this.contractForm.get('discount')?.value as number,
        seller : this.contractForm.get('seller')?.value as string,
        items : listItens,
        observation: this.contractForm.get('observation')?.value as string,
        annotations: this.contractForm.get('annotations')?.value as string,
      }
  
      this.#apiServiceContract.httpCreateContract(contract).pipe(
        tap((res) => {
         this.#router.navigate(['store/orcamento', 'edit', res.id])
        }),
        concatMap(() => this.#apiServiceContract.httpGetContracts())
      ).subscribe();

      }
    }

}
