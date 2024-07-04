import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject, signal } from '@angular/core';
import { ContractServiceService } from '../../../service/contract-service.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContractId } from '../../../interface/contractId.interface';

@Component({
  selector: 'app-footer-contract',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './footer-contract.component.html',
  styleUrl: './footer-contract.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterContractComponent implements DoCheck, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contractId'] && changes['contractId'].currentValue) {
      setTimeout(() => {
        this.editValue();
      }, 0)
    }
  }

  ngDoCheck(): void {
    this.editValue();
  }

  @Input() footerForm!: FormGroup;
  @Input() contractId!: ContractId | null;
  @Input() buttonInput!: string;
  @Input() buttonDisabled!: boolean;

  #apiServiceContract = inject(ContractServiceService);
  public getCreateContractError = this.#apiServiceContract.getContractCreateError;
  public getContractMsgSucess = this.#apiServiceContract.getContractSucess;
  public getContractId = this.#apiServiceContract.getContractId;

  buttonCreate = signal("");
  totalItem = signal(0.00);
  totalDiscount = signal(0.00);
  grandTotal = signal(0.00);

  get getArrayForm() {
    return this.footerForm.get('items') as FormArray;
  }

  get items() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.footerForm.get('items') as FormArray).controls as FormGroup[];
  }

  editValue() {
    this.fullItem();
    this.discount();
    this.valueTotal();
  }

  fullItem() {
    let valorTotal = 0;
    this.items.forEach((a) => {
      
      valorTotal = valorTotal + a.controls['total'].value as number;
    })
    this.totalItem.set(valorTotal);
  }

  discount() {
    let discount = (this.totalItem() * (this.footerForm.get('discount')?.value as number)) / 100;
    this.totalDiscount.set(discount);
  }

  valueTotal() {
    this.grandTotal.set(this.totalItem() - this.totalDiscount());
  }

  ngOnDestroy(): void {
    this.getCreateContractError.set(null);
    this.getContractMsgSucess.set(null);
    
  }

}
