import { style } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewChildren, inject, signal, Output, EventEmitter, OnDestroy } from '@angular/core';

import { TableContractComponent } from '../table-contract/table-contract.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractServiceService } from '../../service/contract-service.service';
import { CurrencyPipe } from '@angular/common';
import { ChangeSituation } from '../../interface/changeSituation.interface';
import { ContractId } from '../../interface/contractId.interface';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TableContractComponent, CurrencyPipe],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDetailsComponent implements OnInit, OnDestroy {


 
  @ViewChild('invoice', {static: true}) invoice!: ElementRef;
  @ViewChild('buttonReserve', {static: true}) buttonReserve!: ElementRef;
 
  #router = inject(ActivatedRoute);
  #apiServiceContract = inject(ContractServiceService);

  public getContractId = this.#apiServiceContract.getContractId;

  idParamContract = signal('');
  valueTotalContract = signal(0);
  valuePay = signal(0);
  amountToPay = signal(0);

  ngOnDestroy(): void {
    this.getContractId.set(null);

  }

  ngOnInit(): void {
    this.idParamContract.set(this.#router.snapshot.params['id']);
   
    this.#apiServiceContract.httpGetContractId(Number(this.idParamContract())).subscribe((res) => this.checkSituation(res.contractSituation));

  }

  buttonSituation = signal('Reservar');

  checkSituation(situation: string) {
      if (situation === "RESERVADO") {
        this.invoice.nativeElement['style'].display = 'inline-block';
        this.buttonReserve.nativeElement['style'].display = 'none';
  
      } else {
        this.invoice.nativeElement['style'].display = 'none';
        this.buttonReserve.nativeElement['style'].display = 'inline-block';
      }
  }

  reserve(invoice: HTMLButtonElement, reserve: HTMLButtonElement, modalReserve: HTMLDialogElement) {
    
    let change: ChangeSituation = {
      contractId: Number(this.idParamContract()),
      situationContract: "RESERVADO"
    }

    this.#apiServiceContract.httpEditSituationContract(change).subscribe();

    invoice.style.display = 'inline-block';
    reserve.style.display = 'none';
    modalReserve.close();

    window.location.reload();

  }

  paymentFuture(dialog: HTMLDialogElement) {
    dialog.showModal();

    this.valueTotalContract.set(this.getContractId()?.valueTotal as number)
    this.valuePay.set(this.getContractId()?.valuePaid as number);
    this.amountToPay.set((this.getContractId()?.valueTotal as number) - (this.getContractId()?.valuePaid as number));
  }

  payment(modalInvoice: HTMLDialogElement, valuePayment: HTMLInputElement) {

    console.log(this.getContractId())
    this.valueTotalContract.set(this.getContractId()?.valueTotal as number)
    

    var payment = valuePayment.value;

    modalInvoice.close();
  }

}
