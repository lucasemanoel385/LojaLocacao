import { GetDataCompany } from './../../../moduleAdmin/components/interface/getDataCompany.interface';
import { concatMap, pipe } from 'rxjs';
import { ContractId } from './../../interface/contractId.interface';
import { style } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewChildren, inject, signal, Output, EventEmitter, OnDestroy } from '@angular/core';

import { TableContractComponent } from '../table-contract/table-contract.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractServiceService } from '../../service/contract-service.service';
import { CurrencyPipe } from '@angular/common';
import { ChangeSituation } from '../../interface/changeSituation.interface';
import { FormArray ,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from '../../../moduleClient/components/pipes/format-date.pipe';
import { PaymentsList } from '../../interface/PaymentsList';
import { DataCompanyService } from '../../../moduleAdmin/components/service/data-company.service';
import { ContractPdfComponent } from '../../pdf-contract/contract-pdf/contract-pdf.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RegisterContractComponent } from '../register-contract/register-contract.component';


@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TableContractComponent, CurrencyPipe, FormsModule, ReactiveFormsModule, ContractPdfComponent, RegisterContractComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('invoice', {static: true}) invoice!: ElementRef;
  @ViewChild('buttonReserve', {static: true}) buttonReserve!: ElementRef;
  @ViewChild('pdfContract', {static: false}) pdfContract!: ElementRef;
  @ViewChild(ContractPdfComponent, {static: false}) pdffContract!: ContractPdfComponent;
 
  #route = inject(Router);
  #router = inject(ActivatedRoute);
  #apiServiceContract = inject(ContractServiceService);
  #apiServiceDataCompnay = inject(DataCompanyService);

  public getContractId = this.#apiServiceContract.getContractId;
  public getContractPaymentSucess = this.#apiServiceContract.getContractPaymentMsgSucess;
  public getContractPaymentError = this.#apiServiceContract.getContractPaymentMsgError;
  public getContractPayment = this.#apiServiceContract.getContractPayment;
  public GetDataCompany = this.#apiServiceDataCompnay.getCompany;

  idParamContract = signal('');
  valueTotalContract = signal(0);
  valuePay = signal(0);
  amountToPay = signal(0);
  contractCurrent = signal<ContractId | null>(null);

  ngOnDestroy(): void {
    this.getContractId.set(null);

  }

  ngOnInit(): void {
    this.idParamContract.set(this.#router.snapshot.params['id']);
    this.#apiServiceDataCompnay.httpGetDataCompany$().subscribe();
    this.#apiServiceContract.httpGetContractId(Number(this.idParamContract())).subscribe((res) => {
      this.checkSituation(res.contractSituation); 
      this.getPaymentContract(res);
      this.contractCurrent.set(res);
    });

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

    this.#apiServiceContract.httpEditSituationContract(change).subscribe(res => {
      invoice.style.display = 'inline-block';
      reserve.style.display = 'none';
      modalReserve.close();
  
      window.location.reload();
    });

    modalReserve.close();
  }


  #fb = inject(FormBuilder);

  paymentForm = this.#fb.group({
    payments: this.#fb.array([
    ]),
  })

  addItens() {
    const addNewPayment = this.#fb.group({
      paymentValue: [],
        datePayment: [],
    })
      return (this.paymentForm.get('payments') as FormArray).push(addNewPayment);
  }

  clearTr(index: number){
    
    (this.paymentForm.get('payments') as FormArray).removeAt(index);
    this.teste(this.paymentForm.value.payments as PaymentsList[]);

  }

  get payments() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.paymentForm.get('payments') as FormArray).controls as FormGroup[];
  }

  private getPaymentContract(res: ContractId) {
    const paymentArrayForm = this.paymentForm.get('payments') as FormArray;

    let indice = 0
    res.payment.forEach((i) => {
      this.addItens();
      var paymentGroupForm = paymentArrayForm.at(indice) as FormGroup;
      paymentGroupForm.get('paymentValue')?.setValue(i.paymentValue);
      paymentGroupForm.get('datePayment')?.setValue(new FormatDatePipe().transformInputDate(i.datePayment));
      
      indice ++;
      })
      

  }

  paymentFuture(dialog: HTMLDialogElement) {
    dialog.showModal();
    this.#apiServiceContract.httpGetPaymentsContract$(this.idParamContract()).subscribe();
    console.log(this.getContractId());
    this.valueTotalContract.set(this.getContractId()?.valueTotal as number)
    this.teste(this.getContractPayment() as PaymentsList[])
   
  }

  attValuePaid(payments: any) {
    this.teste(this.paymentForm.value.payments as PaymentsList[]);
  }

  private teste(payments: PaymentsList[]) {

    var valuePaid: number = 0;

    payments.forEach(a => valuePaid += a.paymentValue)

    this.amountToPay.set(valuePaid);

  }

  payment(modalInvoice: HTMLDialogElement) {

    this.#apiServiceContract.httpPaymentsContract$(this.idParamContract(), this.paymentForm.value).pipe(concatMap(() => 
      this.#apiServiceContract.httpGetPaymentsContract$(this.idParamContract())
    ))
      .subscribe(res => console.log(res));

  }

  navigateToPrintOut() {

    this.#route.navigate([`../contract/${this.getContractId()?.id}`])

  }

}
