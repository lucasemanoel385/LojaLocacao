import { Data } from "@angular/router";
import { RegisterExepenses } from "./RegisterExpenses.interface";
import { ListExpenses } from "./ListExpenses.interface";

export interface DataAccouting {

    sumPaymentsMonth:number
    sumPaymentsYear: number,
    valueExpensesMonth: number,
    valueExpensesYear: number,
    expensesList: ListExpenses[]

}