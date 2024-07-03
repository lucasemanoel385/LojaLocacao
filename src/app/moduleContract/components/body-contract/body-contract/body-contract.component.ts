import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../moduleItem/service/product.service';
import { ContractServiceService } from '../../../service/contract-service.service';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../../../../moduleItem/interface/Item';
import { forbiddenNameValidator } from '../../table-contract/table-contract.component';
import { ContractId } from '../../../interface/contractId.interface';
import { ContractItens } from '../../../interface/contractItens.interface';

@Component({
  selector: 'app-body-contract',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
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

  #apiServiceItem = inject(ProductService);
  #apiServiceContract = inject(ContractServiceService);
  public listaItem$ = this.#apiServiceItem.getAllItemList;
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  idItem!: string;
  filterWrite!: string;

  editBody(contract: ContractId) {

    let indice = 0;

    contract.items.forEach((i) => {
      console.log(i);
       this.addItens();
       this.setValueInputEdit(indice, i)
       indice ++;
     })

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

  botaLista(e: Event, index: number) {
    console.log(e)
    const t: any = document.getElementById(index.toString() + 'list');
    if(e) {
      t.style.display = 'list-item';
      
    }
  }

  listFilter!: Item[];

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

  get getArrayForm() {
    return this.bodyForm.get('items') as FormArray;
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
    
    /*this.valueTotalItem.set((valueItem * amountItem));
 
    let valueItens = this.fullItem();
    let discountItem = this.discount();
    this.valueTotal(valueItens, discountItem);*/
  }

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.bodyForm.get('items') as FormArray).controls as FormGroup[];
  }

  clearTr(index: number){

    (this.bodyForm.get('items') as FormArray).removeAt(index);

    /*let valueItens = this.fullItem();
    let discountItem = this.discount();
    this.valueTotal(valueItens, discountItem);*/

  }

  addItens() {
    this.addItemForm.emit();
  }

}
