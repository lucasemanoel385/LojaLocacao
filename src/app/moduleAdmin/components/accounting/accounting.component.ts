import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, MinValidator, ReactiveFormsModule } from '@angular/forms';
import { DataCompanyService } from '../service/data-company.service';
import { RegisterExepenses } from '../interface/RegisterExpenses.interface';
import { CurrencyPipe, formatDate } from '@angular/common';
import { concatMap } from 'rxjs';
import { FormatDatePipe } from '../../../moduleClient/components/pipes/format-date.pipe';
import { DataAccouting } from '../interface/DataAccouting.interface';

@Component({
  selector: 'app-accounting',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, FormatDatePipe],
  templateUrl: './accounting.component.html',
  styleUrl: './accounting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingComponent implements OnInit {
  ngOnInit(): void {
    
    this.#serviceDataCompany.httpGetDataAccouting$(this.today()).subscribe(res => this.editSumLiquidMonthAndYear(res)) 

  }

  #serviceDataCompany = inject(DataCompanyService);
  public getDataAccounting = this.#serviceDataCompany.getAccouting;
  public getMsgExpensesSucess = this.#serviceDataCompany.getMsgSucessExpenses;
  public getMsgExpensesError = this.#serviceDataCompany.getMsgErrorExpenses

  public today = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  public ExpensesMonth(value: string) {
    this.today.set(value)
    console.log(this.today())
    this.#serviceDataCompany.httpGetDataAccouting$(this.today()).subscribe(res => {
      this.editSumLiquidMonthAndYear(res)
    });
  }

  valueLiquidMonth = signal(0);
  valueLiquidYear = signal(0);

  #fb = inject(FormBuilder);

  expensesForm = this.#fb.group({
    description: [''],
    value: [0],
    date: [Date]
   
  })

  submitExpenses() {

    this.#serviceDataCompany.httpRegisterExpenses$((this.expensesForm.value) as RegisterExepenses).pipe(
      concatMap(() => this.#serviceDataCompany.httpGetDataAccouting$(this.today()))
    ).subscribe(res => this.editSumLiquidMonthAndYear(res));
    
    setTimeout(() => {
      this.getMsgExpensesSucess.set(null);
      this.getMsgExpensesError.set(null);
    }, 2000)
  }

  editSumLiquidMonthAndYear(res: DataAccouting) {
    console.log(this.getDataAccounting());
    this.valueLiquidYear.set(res.sumPaymentsYear - res.valueExpensesYear)
    this.valueLiquidMonth.set(res.sumPaymentsMonth - res.valueExpensesMonth);
  }

  deleteExpenseId!: any;
  deleteRowTableIndex!: any;

  closeDialog(dialog: HTMLDialogElement) {
    this.expensesForm.reset();
    dialog.close();
  }

  clearTr(modalDelete: HTMLDialogElement) {
    this.#serviceDataCompany.httpDeleteExpenses$(this.deleteExpenseId).pipe(
      concatMap(() => this.#serviceDataCompany.httpGetDataAccouting$(this.today()))
    ).subscribe(res => this.editSumLiquidMonthAndYear(res));
    modalDelete.close();
  }

}
