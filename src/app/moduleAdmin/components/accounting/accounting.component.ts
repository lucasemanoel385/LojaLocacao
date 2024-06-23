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
    console.log(this.today())
    this.#serviceDataCompany.httpGetDataAccouting$(this.today()).subscribe(res => 
      this.editSumLiquidMonthAndYear(res)
    );
  }

  public today = signal(formatDate(Date.now(), 'yyyy-MM-dd', 'pt-BR'));

  public ExpensesMonth(value: string) {
    this.today.set(value)
    console.log(this.today())
    this.#serviceDataCompany.httpGetDataAccouting$(this.today()).subscribe(res => {
      this.editSumLiquidMonthAndYear(res)
    });
  }

  #serviceDataCompany = inject(DataCompanyService);

  public getDataAccounting = this.#serviceDataCompany.getAccouting;

  valueLiquidMonth = signal(0);
  valueLiquidYear = signal(0);

  #fb = inject(FormBuilder);

  expensesForm = this.#fb.group({
    description: [''],
    value: [0],
    date: [Date]
   
  })

  /*addItens() {
    const addNewExpense = this.#fb.group({
      description: [''],
      value: [0],
      date: [Date]
    })
      return (this.expensesForm.get('expenses') as FormArray).push(addNewExpense);
  }

  get expenses() {
    //Indicamos que dentro do nosso formArray tem controls que são FormGroup
    
    return (this.expensesForm.get('expenses') as FormArray).controls as FormGroup[];
  }*/


  submitExpenses() {

    this.#serviceDataCompany.httpRegisterExpenses$((this.expensesForm.value) as RegisterExepenses).pipe(
      concatMap(() => this.#serviceDataCompany.httpGetDataAccouting$(this.today()))
    ).subscribe(res => this.editSumLiquidMonthAndYear(res));
    
  }

  editSumLiquidMonthAndYear(res: DataAccouting) {
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
    ).subscribe(res => this.editSumLiquidMonthAndYear(res));
    this.getDataAccounting()?.expensesList.splice(this.deleteRowTableIndex, 1);
    modalDelete.close();
  }

}
