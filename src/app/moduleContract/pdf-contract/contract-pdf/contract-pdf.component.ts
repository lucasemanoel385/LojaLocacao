import { style } from '@angular/animations';
import { AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject, signal } from '@angular/core';
import { ContractId } from '../../interface/contractId.interface';
import { GetDataCompany } from '../../../moduleAdmin/components/interface/getDataCompany.interface';
import { PaymentsList } from '../../interface/PaymentsList';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { ContractServiceService } from '../../service/contract-service.service';
import { DataCompanyService } from '../../../moduleAdmin/components/service/data-company.service';
import { CurrencyPipe } from '@angular/common';
import { FormatDatePipe } from '../../../moduleClient/components/pipes/format-date.pipe';
import { CpfCnpjPipe } from '../../../moduleClient/components/pipes/cpf-cnpj.pipe';
import { PhonePipe } from '../../../moduleClient/components/pipes/phone.pipe';

@Component({
  selector: 'app-contract-pdf',
  standalone: true,
  imports: [CurrencyPipe, FormatDatePipe, CpfCnpjPipe, PhonePipe],
  templateUrl: './contract-pdf.component.html',
  styleUrl: './contract-pdf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractPdfComponent implements OnInit {

  @ViewChild('signature', {static: true}) signature!: ElementRef;

  ngOnInit(): void {
    this.#apiServiceDataCompnay.httpGetDataCompany$().subscribe(res => {
      this.companyData.set(res);
      let formattedClauses = res.clauses.replaceAll('\n', '<br>');
      this.clauses.set(`<p>${formattedClauses}</p>`);
      let formattedObservation = res.observation.replaceAll('\n', '<br>');
      this.observation += (`<p>${formattedObservation}</p>`);
    });
    this.#apiServiceContract.httpGetContractId(this.#router.snapshot.params['id']).subscribe(res => {
      this.contract.set(res);
      let formattedObservation = res.observation.replaceAll('\n', '<br>');
      this.observation += (`<p>${formattedObservation}</p>`);
      if(this.contract()?.contractSituation === "ORCAMENTO") {
        this.clauses.set('');
        this.signature.nativeElement['style'].display = 'none';
      }

    });

  }

  #router = inject(ActivatedRoute);
  #apiServiceContract = inject(ContractServiceService);
  #apiServiceDataCompnay = inject(DataCompanyService);

  contract = signal<ContractId | null>(null);
  companyData = signal<GetDataCompany | null>(null);

  clauses = signal('');
  observation = '';
  
  @ViewChild('pdfContract') contractPdf!: ElementRef;

}
