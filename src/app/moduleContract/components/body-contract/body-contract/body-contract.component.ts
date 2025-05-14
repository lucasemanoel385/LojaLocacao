import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../moduleItem/service/product.service';
import { ContractServiceService } from '../../../service/contract-service.service';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../../../../moduleItem/interface/Item';
import { ContractId } from '../../../interface/contractId.interface';
import { ContractItens } from '../../../interface/contractItens.interface';
import { ArrowSelectComponent } from '../../../../componentsTemplate/arrowSelect/arrow-select/arrow-select.component';
import { Subject, debounce, debounceTime, fromEvent } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-body-contract',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, ArrowSelectComponent, NgxMaskDirective],
  templateUrl: './body-contract.component.html',
  styleUrl: './body-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyContractComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'].currentValue) {
      this.editBody(this.contractId as ContractId);
    }
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
    formGroup.get('cod')?.setValue(novoValor.cod);
    formGroup.get('name')?.setValue(novoValor.name);
    formGroup.get('amount')?.setValue(novoValor.amount);
    formGroup.get('value')?.setValue(novoValor.value, Validators.requiredTrue);
    console.log(novoValor.value);


    setTimeout(() => {
      this.setValueTotal(indice);
      const reference: any = document.getElementById(indice.toString() + 'reference');
      reference.innerText = novoValor.reference;
      const img: any = document.getElementById(indice.toString() + 'img');
      img.src = novoValor.imagem;
    }, 0)
 
  }

  ulIdentifier!: string;

  filterItem(e: Event, is: number) {
    const target = e.target as HTMLInputElement;
    const valueInput = target.value.toUpperCase();
    if(valueInput === '') {
      this.listOut(is)
    } else {
      this.putList(is);
    }
    this.#apiServiceItem.httpGetAllItems$(valueInput).subscribe(res => this.listFilter.set(this.listItem$()));
    this.#arrowSelect.arrowSelect(e as KeyboardEvent, this.ulIdentifier);
  }
  

  putList(index: number) {
    const ul: HTMLElement = document.getElementById(index.toString() + 'list') as HTMLElement;
    if(ul) {
      this.ulIdentifier = ul.id;
      ul.style.display = 'list-item';
    }
  }

  listFilter = signal<Item[] | null>(null);

  listOut(index?: number){
    const t: any = document.getElementById((index as number).toString() + 'list');
    setTimeout(() => {
    
        t.style.display = 'none';
        let list!: Item[];
        this.listFilter.set(list);

    }, 160)
  }

  get getArrayForm() {
    return this.bodyForm.get('items') as FormArray;
  }

  //Set inputs of item
  setValueInput(indice: number, novoValor: Item) {
    console.log(novoValor.cod);
    const formGroup = this.getArrayForm.at(indice) as FormGroup;
    formGroup.get('cod')?.setValue(novoValor.cod);
    formGroup.get('name')?.setValue(novoValor.name);
    //formGroup.get('value')?.setValue(novoValor.value, Validators.requiredTrue);

    const reference: any = document.getElementById(indice.toString() + 'reference');
    const img: any = document.getElementById(indice.toString() + 'img');
    reference.innerText = novoValor.reference;
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
    console.log(this.bodyForm.get('items') as FormArray);
  }

  addItens() {
    this.addItemForm.emit();
  }

}
