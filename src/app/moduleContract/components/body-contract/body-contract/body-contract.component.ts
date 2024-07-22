import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../moduleItem/service/product.service';
import { ContractServiceService } from '../../../service/contract-service.service';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../../../../moduleItem/interface/Item';
import { forbiddenNameValidator } from '../../table-contract/table-contract.component';
import { ContractId } from '../../../interface/contractId.interface';
import { ContractItens } from '../../../interface/contractItens.interface';
import { ArrowSelectComponent } from '../../../../componentsTemplate/arrowSelect/arrow-select/arrow-select.component';

@Component({
  selector: 'app-body-contract',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, ArrowSelectComponent],
  templateUrl: './body-contract.component.html',
  styleUrl: './body-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyContractComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'].currentValue) {
      this.editBody(this.contractId as ContractId);
    }
  }

  ngOnInit(): void {
    this.#apiServiceItem.httpGetAllItems$().subscribe();
  }

  @Input() bodyForm!: FormGroup;
  @Input() contractId!: ContractId | null;
  @Output() addItemForm = new EventEmitter<Event>;

  #arrowSelect = new ArrowSelectComponent();
  #apiServiceItem = inject(ProductService);
  #apiServiceContract = inject(ContractServiceService);
  public listItem$ = this.#apiServiceItem.getAllItemList;
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  idItem!: string;
  filterWrite!: string;

  //edit
  editBody(contract: ContractId) {
    let indice = 0;
    contract.items.forEach((i) => {
      console.log(i);
       this.addItens();
       this.setValueInputEdit(indice, i)
       indice ++;
     })
  }

  //Set inputs of item edit
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

  ulIdentifier!: string;

  filterItem(e: Event, is: number) {
    const target = e.target as HTMLInputElement;
    const valueInput = target.value.toUpperCase();
    const lista = this.listItem$();
    
    let list!: Item[];
    
    if(valueInput.length > 3 ) {
      list = lista!.filter(a => a.name.toUpperCase().indexOf(valueInput) > -1);
      

    } else if(valueInput.length > 0) {
      list = lista!.filter(a => a.cod.toString().indexOf(valueInput) > -1);
      
    }

    this.listFilter.set(list);
    this.putList(is);
    this.#arrowSelect.arrowSelect(e as KeyboardEvent, this.ulIdentifier);
    
  }
  

  putList(index: number) {
    const ul: HTMLElement = document.getElementById(index.toString() + 'list') as HTMLElement;
      ul.style.display = 'list-item';
      this.ulIdentifier = ul.id;
  }

  listFilter = signal<Item[] | null>(null);

  listOut(e: Event, index: number){
    const t: any = document.getElementById(index.toString() + 'list');
    setTimeout(() => {
      if(e) {
        t.style.display = 'none';
        let list!: Item[];
        this.listFilter.set(list);
      }
    }, 160)
  }

  get getArrayForm() {
    return this.bodyForm.get('items') as FormArray;
  }

  //Set inputs of item
  setValueInput(indice: number, novoValor: Item) {
    
    const formGroup = this.getArrayForm.at(indice) as FormGroup;
    formGroup.get('id')?.setValue(novoValor.id);
    formGroup.get('name')?.setValue(novoValor.name);
    formGroup.get('value')?.setValue(novoValor.value, Validators.requiredTrue);

    const img: any = document.getElementById(indice.toString() + 'img');
    img.src = novoValor.imagem;

  }

  //Set value total of item
  setValueTotal(index: number) {
    const formGroup = this.getArrayForm.at(index) as FormGroup;
    let valueItem = formGroup.get('value')?.value;

    let amountItem = formGroup.get('amount')?.value;
    formGroup.get('total')?.setValue(valueItem * amountItem);

    const total: any = document.getElementById(index.toString() + 'total');
    total.innerText = new CurrencyPipe("pt-BR").transform(formGroup.get('total')?.value, 'BRL');
  }

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    return (this.bodyForm.get('items') as FormArray).controls as FormGroup[];
  }

  clearTr(index: number){
    (this.bodyForm.get('items') as FormArray).removeAt(index);
  }

  addItens() {
    this.addItemForm.emit();
  }

}
