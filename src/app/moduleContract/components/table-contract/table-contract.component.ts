import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FilterPipePipe } from '../../../modules/contract-budget/filter-pipe.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule, CurrencyPipe, formatDate } from '@angular/common';
import { Item } from '../../../moduleItem/interface/Item';
import { ProductService } from '../../../moduleItem/service/product.service';
import { ClientService } from '../../../moduleClient/service/client.service';
import { ClientList } from '../../../moduleClient/interface/clientList.interface';
import { CpfCnpjPipe } from '../../../moduleClient/components/pipes/cpf-cnpj.pipe';
import { ContractCreate } from '../../interface/contractCreate.interface';
import { ContractServiceService } from '../../service/contract-service.service';
import { itensList } from '../../interface/itemsList';
import { ContractId } from '../../interface/contractId.interface';
import { ContractList } from '../../interface/contractList.interface';
import { ContractItens } from '../../interface/contractItens.interface';
import { FormatDatePipe } from '../../../moduleClient/components/pipes/format-date.pipe';
import { ContractEdit } from '../../interface/contractEdit.interface';
import { BackHistoryComponent } from '../../../componentsTemplate/back-history/back-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs';


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.setValue("") } } : null;
  };
}

@Component({
  selector: 'app-table-contract',
  standalone: true,
  imports: [ReactiveFormsModule, FilterPipePipe, NgxMaskDirective, CurrencyPipe, CommonModule, CpfCnpjPipe, FormsModule, BackHistoryComponent],
  templateUrl: './table-contract.component.html',
  styleUrl: './table-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContractComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit{
  ngAfterViewInit(): void {
    this.#apiServiceItem.httpGetAllItems$().subscribe();
  }


  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'].currentValue) {
      this.editContract(this.contractId as ContractId);
    }
    
  }
 
  ngOnInit(): void {
    /*console.log(this.contractId)
    this.editContract(this.contractId as ContractId);*/
  }

  ngOnDestroy(): void {
    this.getCreateContractError.set(null);
    this.getContractMsgSucess.set(null);
    
  }

  #apiServiceItem = inject(ProductService);
  #apiServiceClient = inject(ClientService);
  #apiServiceContract = inject(ContractServiceService);
  public listaItem$ = this.#apiServiceItem.getAllItemList;
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  public today = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  @Input() idContract!: string;
  @Input() buttonCreate: string = "Cadastrar contrato";
  @Input() contractId!: ContractId | null;

  totalItem = signal(0.00);
  totalDiscount = signal(0.00);
  grandTotal = signal(0.00);
  listClients = signal<ClientList[] | null>(null);

  status = signal("Novo orçamento");

  checkDate(dateOf: HTMLInputElement) {
    console.log(dateOf.value <= this.today())
    return dateOf.value <= this.today();
  }

  public idClient!: number;

  /*editContract() {

    var client = this.getContractId();

    this.contractForm.setValue({
      client: `${client?.idClient} - ${client?.nameClient}` as string,
      dateOf: client?.dateOf,
      dateUntil: client?.dateUntil,
      contactPhone: client?.contactPhone,
      discount: client?.discount,
      seller: client?.seller,
      items: client?.items.forEach((a) => {a. idItem, a.cod})

    })

  }*/

  editContract(res: ContractId) {
    var listItens: itensList[] = [];

    /*this.items.forEach((i) => {
        let list: itensList = {
        id: i.get('id')?.value,
        amount: i.get('amount')?.value,
        total: i.get('total')?.value
      }
      listItens.push(list);
      console.log(listItens);
    })*/

    switch (res.contractSituation) {
      case "ORCAMENTO":
        this.status.set("ORÇAMENTO");
        break;
      case "RESERVADO":
        this.status.set("RESERVADO");
    }
    this.contractForm.patchValue({
      client: new CpfCnpjPipe().transform(res.client.cpfCnpj) + ' - ' + res.client.nameReason,
      dateOf: new FormatDatePipe().transformInputDate(res.dateOf),
      dateUntil: new FormatDatePipe().transformInputDate(res.dateUntil),
      discount: res.discount,
      seller: res.seller,
      observation: res.observation,
      annotations: res.annotations,
    })

    let indice = 0;

    res.items.forEach((i) => {
     console.log(i);
      this.addItens();
      this.setValueInputEdit(indice, i)
      indice ++;
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

  setValueClient(id: number, cpf: string, name: string) {
    this.contractForm.patchValue({
      client: new CpfCnpjPipe().transform(cpf) + ' - ' + name,
    })

    this.idClient = id;
  }



  valueTotalItem = signal(0.00);
  idItem!: string;
  public listFilter!: Item[];
  filterWrite = '';
  
  filterItem(e: Event, is: number) {
    const target = e.target as HTMLInputElement;
    const valueInput = target.value.toUpperCase();
    const lista = this.listaItem$();

    let list!: Item[];
   
    if(valueInput.length > 3) {
      
      list = lista!.filter(a => a.name.toUpperCase().indexOf(valueInput) > -1);

    } else {
      list = lista!.filter(a => a.cod.toString().indexOf(valueInput) > -1);
      
    }

    this.idItem = target.id;
    this.filterWrite = valueInput;
    this.listFilter = list;
  }

  
  setValueInputEdit(indice: number, novoValor: ContractItens) {
    
    const formGroup = this.getArrayForm.at(indice) as FormGroup;
    formGroup.get('id')?.setValue(novoValor.id);
    formGroup.get('name')?.setValue(novoValor.name);
    formGroup.get('amount')?.setValue(novoValor.amount);
    formGroup.get('value')?.setValue(novoValor.value, Validators.requiredTrue);
    
    setTimeout(() => {
      this.setValueTotal(indice);
      const img: any = document.getElementById(indice.toString() + 'img');

      img.src = novoValor.imagem;
    }, 0)
 
  }

  setValueInput(indice: number, novoValor: Item) {
    
    const formGroup = this.getArrayForm.at(indice) as FormGroup;
    formGroup.get('id')?.setValue(novoValor.id);
    formGroup.get('name')?.setValue(novoValor.name);
    formGroup.get('value')?.setValue(novoValor.value, Validators.requiredTrue);

    const img: any = document.getElementById(indice.toString() + 'img');
    img.src = novoValor.imagem;

 
  }

  setValueTotal(index: number) {
    const formGroup = this.getArrayForm.at(index) as FormGroup;
    let valueItem = formGroup.get('value')?.value;

    let amountItem = formGroup.get('amount')?.value;
    formGroup.get('total')?.setValue(valueItem * amountItem);

    const total: any = document.getElementById(index.toString() + 'total');
    total.innerText = new CurrencyPipe("pt-BR").transform(formGroup.get('total')?.value, 'BRL');
    
    this.valueTotalItem.set((valueItem * amountItem));
 
    let valueItens = this.fullItem();
    let discountItem = this.discount();
    this.valueTotal(valueItens, discountItem);
  }

  fullItem() {
    let valorTotal = 0;
    this.items.forEach((a) => {
      valorTotal = valorTotal + a.controls['total'].value as number;
    })
    this.totalItem.set(valorTotal);

    return valorTotal;
  }

  discount() {
    let discount = (this.totalItem() * (this.contractForm.get('discount')?.value as number)) / 100;
    this.totalDiscount.set(discount);
    this.valueTotal(this.totalItem(), discount);
    return discount;
  }

  valueTotal(valueTotal: number, discount: number) {
    this.grandTotal.set(valueTotal - discount);
  }

  botaLista(e: Event, index: number) {
    console.log(e)
    const t: any = document.getElementById(index.toString() + 'list');
    if(e) {
      t.style.display = 'list-item';
      
    }
  }

  tiraLista(e: Event, index: number){
    const t: any = document.getElementById(index.toString() + 'list');
    setTimeout(() => {
      if(e) {
        t.style.display = 'none';
        let list!: Item[];
        this.listFilter = list;
      }
    }, 200)
  }
  
  /*arrowSelect(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown" : 
        
    }
  }*/

  #fb = inject(FormBuilder);

  public contractForm = this.#fb.group({
      client: [''],
      dateOf: [''],
      dateUntil: [],
      discount: [0],
      seller : [''],
      items: this.#fb.array([]),
      observation: [''],
      annotations: ['']
  });

  addItens() {
    const addNewItem = this.#fb.group({
      id: [],
      name: [],
      amount: [, [forbiddenNameValidator(/-/i)]],
      value: [],
      total: []
      
    })
      return (this.contractForm.get('items') as FormArray).push(addNewItem);
  }

  get getArrayForm() {
    return this.contractForm.get('items') as FormArray;
  }
  
  clearTr(index: number){
    /*this.table.nativeElement.addEventListener("click", function(event:any) {
      var elementoClicado = event.target;
      if(elementoClicado.classList.contains("btn-excluir")) {
        var celular = elementoClicado.parentNode;
        var linha = celular.parentNode;
        linha.remove();
      }
    });*/
    
    (this.contractForm.get('items') as FormArray).removeAt(index);

    let valueItens = this.fullItem();
    let discountItem = this.discount();
    this.valueTotal(valueItens, discountItem);

  }

  #router = inject(Router);
  #route = inject(ActivatedRoute);

  public submit() {

    var listItens: itensList[] = [];

    this.items.forEach((i) => {
      let list: itensList = {
        id: i.get('id')?.value,
        amount: i.get('amount')?.value,
        total: i.get('total')?.value
      }
      listItens.push(list);
      
    })
    console.log(this.idClient)
    if (this.contractId) {

      const contract: ContractEdit = {
        contractId: Number(this.contractId.id),
        clientId: this.contractId.client.id,
        dateOf: this.contractForm.get('dateOf')?.value,
        dateUntil: this.contractForm.get('dateUntil')?.value,
        discount: this.contractForm.get('discount')?.value as number,
        items : listItens,
        observation: this.contractForm.get('observation')?.value as string,
        annotations: this.contractForm.get('annotations')?.value as string,
      }
      console.log(this.contractForm.value)
      this.#apiServiceContract.httpEditContract(contract).pipe(
        concatMap(() => this.#apiServiceContract.httpGetContracts())
      ).subscribe();

      setTimeout(() => {
        this.getCreateContractError.set(null);
        this.getContractMsgSucess.set(null);
      }, 5000)
    } else {
      const contract: ContractCreate = {
        client: this.idClient,
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

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.contractForm.get('items') as FormArray).controls as FormGroup[];
  }
  

}
