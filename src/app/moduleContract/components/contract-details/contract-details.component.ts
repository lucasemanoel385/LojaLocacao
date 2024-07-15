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

  ngOnInit(): void {
    this.idParamContract.set(this.#router.snapshot.params['id']);
    this.#apiServiceContract.httpGetPaymentsContract$(this.idParamContract()).subscribe();
    this.#apiServiceDataCompnay.httpGetDataCompany$().subscribe();
    this.#apiServiceContract.httpGetContractId(Number(this.idParamContract())).subscribe((res) => {
      this.checkSituation(res.contractSituation); 
      this.getPaymentContract(res);
      this.contractCurrent.set(res);
    });
  }

  @ViewChild('invoice', {static: true}) invoice!: ElementRef;
  @ViewChild('buttonReserve', {static: true}) buttonReserve!: ElementRef;
  @ViewChild('pdfContract', {static: false}) pdfContract!: ElementRef;
  @ViewChild(ContractPdfComponent, {static: false}) pdffContract!: ContractPdfComponent;
 
  //Routers
  #route = inject(Router);
  #router = inject(ActivatedRoute);

  //Get data APIS
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
  buttonSituation = signal('Reservar');

  //Display invoice depending of situation
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

  //Form of payment
  #fb = inject(FormBuilder);
  paymentForm = this.#fb.group({
    payments: this.#fb.array([
    ]),
  })
  //add items in the formPayment
  addItens() {
    const addNewPayment = this.#fb.group({
      paymentValue: [],
        datePayment: [],
    })
      return (this.paymentForm.get('payments') as FormArray).push(addNewPayment);
  }

  //Delete payment index
  clearTr(index: number){
    (this.paymentForm.get('payments') as FormArray).removeAt(index);
    this.sumValuePaid(this.paymentForm.value.payments as PaymentsList[]);
  }

  get payments() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.paymentForm.get('payments') as FormArray).controls as FormGroup[];
  }

  // add and set values in form
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

  //Show dialog and values
  paymentFuture(dialog: HTMLDialogElement) {
    dialog.showModal();
    console.log(this.getContractId());
    this.valueTotalContract.set(this.getContractId()?.valueTotal as number)
    this.sumValuePaid(this.getContractPayment() as PaymentsList[])
   
  }

  
  attValuePaid(payments: any) {
    this.sumValuePaid(this.paymentForm.value.payments as PaymentsList[]);
  }

  // Sum values paid
  private sumValuePaid(payments: PaymentsList[]) {

    var valuePaid: number = 0;
    payments.forEach(a => valuePaid += a.paymentValue)
    this.amountToPay.set(valuePaid);

  }

  //Push data for api
  payment(modalInvoice: HTMLDialogElement) {
    this.#apiServiceContract.httpPaymentsContract$(this.idParamContract(), this.paymentForm.value).pipe(concatMap(() => 
      this.#apiServiceContract.httpGetPaymentsContract$(this.idParamContract())
    ))
      .subscribe();

  }

  navigateToPrintOut() {
    if (window.innerWidth < 733) {
      this.#route.navigate([`../store/orcamento/pdf/${this.getContractId()?.id}`]);
    } else {
      window.open(this.#route.createUrlTree([`/store/orcamento/pdf/${this.getContractId()?.id}`]).toString());
    }
    
  }

  ngOnDestroy(): void {
    this.getContractId.set(null);
  }

}
