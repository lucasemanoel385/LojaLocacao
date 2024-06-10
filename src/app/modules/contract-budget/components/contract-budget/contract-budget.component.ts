import { AfterViewInit, Component, ElementRef, ViewChild, inject, signal, ContentChild, NgModule, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, PipeTransform, ViewChildren, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FilterPipePipe } from '../../filter-pipe.pipe';
import { NgxMaskDirective } from 'ngx-mask';
import { CommonModule } from '@angular/common';


/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.setValue("") } } : null;
  };
}

@Component({
  selector: 'app-contract-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FilterPipePipe, NgxMaskDirective],
  templateUrl: './contract-budget.component.html',
  styleUrl: './contract-budget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractBudgetComponent {


  @ViewChild('0item') public nameInput!: ElementRef;
  tt!: string;
  idItem!: string;
  filter(e: Event) {
    
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idItem = target.id;
    this.filtro = value; 
    
  }
  /*arrowSelect(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown" : 
        
    }
  }*/

  index!: string;

  t!: HTMLInputElement;

  disable!: boolean;

  filtro = '';

  lista: string[] = [
    '132132',
    '456465',
    '465465',
    '89897',
    '09068306642'
];

  itens = [{
    name: 'blusa preta',
    valor: 10,
  }];

  #fb = inject(FormBuilder);

  public contractForm = this.#fb.group({
      cpf: [],
      dateOf: [],
      dateUntil: [],
      contactPhone: [],
      items: this.#fb.array([this.#fb.group({
        name: [`${this.filtro}`],
        amount: [, [forbiddenNameValidator(/-/i)]],
        value: [],
        
      })])
  });
  

  clearTr(index: number){
    /*this.table.nativeElement.addEventListener("click", function(event:any) {
      var elementoClicado = event.target;
      if(elementoClicado.classList.contains("btn-excluir")) {
        var celular = elementoClicado.parentNode;
        var linha = celular.parentNode;
        linha.remove();
      }
    });*/

    return (this.contractForm.get('items') as FormArray).removeAt(index);
    
  }

  public submit() {
    console.log(this.contractForm.value)
    alert('cadastrado contrato');
  }

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.contractForm.get('items') as FormArray).controls as FormGroup[];
  }
  
  addItens() {
    const addNewItem = this.#fb.group({
      name: [],
      amount: [],
      value: [],
      
    })
      return (this.contractForm.get('items') as FormArray).push(addNewItem);
  }

  get  getArrayForm() {
    return this.contractForm.get('items') as FormArray;
  }

  setValueInput(indice: number, novoValor: string) {
    const formGroup = this. getArrayForm.at(indice) as FormGroup;
    formGroup.get('name')?.setValue(novoValor);

    const t: any = document.getElementById(indice.toString() + 'list');
    if(this.tiraLista!) {
      t.style.display = 'none';
    }
  }

  botaLista(e: Event, is: number) {
    const t: any = document.getElementById(is.toString() + 'list');
    if(e) {
      t.style.display = 'list-item';
    }
  }

  tiraLista(e: Event){
    return e;
  }
}
