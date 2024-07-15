import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { Scheduling } from '../interface/scheduling.interface';
import { Task } from '../interface/task.interface';
import { ContractItens } from '../../moduleContract/interface/contractItens.interface';
import { ContractList } from '../../moduleContract/interface/contractList.interface';
import { ContractId } from '../../moduleContract/interface/contractId.interface';
import { DataContractDashBoard } from '../interface/dataContractDashBoard.interface copy';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  #http = inject(HttpClient);
  #url = signal(environment.api)


  #setListContractMonth = signal<ContractList[] | null>(null);
  get getListContractMonth() {
    return this.#setListContractMonth.asReadonly();
  }

  #setDataBudgetMonth = signal<DataContractDashBoard | null>(null);
  get getDataBudgetMonth() {
    return this.#setDataBudgetMonth.asReadonly();
  }

  // START APISCHEDULING
  #setListScheduling = signal<Scheduling[] | null>(null);
  get getListScheduling() {
    return this.#setListScheduling.asReadonly();
  }

  #setSchedulingError = signal<Scheduling | null>(null);
  get getListSchedulingError() {
    return this.#setSchedulingError;
  }

  #setCreateScheduling = signal<String | null>(null);
  get getCreateScheduling() {
    return this.#setCreateScheduling;
  }

  public httpGetContractsMonth$(month: string): Observable<ContractList[]> {

    return this.#http.get<ContractList[]>(`${this.#url()}contrato/contractMonth/${month}`).pipe(shareReplay(), 
    tap((res) => this.#setListContractMonth.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setSchedulingError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpGetBudgetsForMonth$(month: string): Observable<DataContractDashBoard> {

    return this.#http.get<DataContractDashBoard>(`${this.#url()}contrato/budgets/${month}`).pipe(shareReplay(), 
    tap((res) => this.#setDataBudgetMonth.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setSchedulingError.set(error.error);
      return throwError(() => error);
    }))
  }
  
  public httpGetScheduling$(date: string): Observable<Scheduling[]> {

    return this.#http.get<any>(`${this.#url()}scheduling/${date}`).pipe(shareReplay(), 
    tap( (res) => this.#setListScheduling.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setSchedulingError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpCreateScheduling$(scheduling: Scheduling): Observable<String>{

    this.#setCreateScheduling.set(null);
    this.#setSchedulingError.set(null);

    return this.#http.post<String>(`${this.#url()}scheduling`, scheduling ).pipe(shareReplay(),
    tap( () => this.#setCreateScheduling.set("Agendado com sucesso")),
    catchError( (error: HttpErrorResponse) => {
      this.#setSchedulingError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpDeleteSchedulingId$(id: number): Observable<any>{
    return this.#http.delete(`${this.#url()}scheduling/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setSchedulingError.set(error.error.message);
      return throwError(() => error);
    } ))
  }
  
  // END APISCHEDULING

  // START TASKS

  #setListTasks = signal<Task[] | null>(null);
  get getListTasks() {
    return this.#setListTasks.asReadonly();
  }

  #setTaskError = signal<Task | null>(null);
  get getTaskError() {
    return this.#setTaskError;
  }

  #setCreateTask = signal<String | null>(null);
  get getCreateTask() {
    return this.#setCreateTask.asReadonly();
  }

  public httpGetTasks$(): Observable<Task[]> {

    this.#setListTasks.set(null);
    this.#setTaskError.set(null);
    
    return this.#http.get<Task[]>(`${this.#url()}task`).pipe(shareReplay(), 
    tap( (res) => this.#setListTasks.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setTaskError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpCreateTask$(description: string): Observable<String>{

    this.#setCreateTask.set(null);
    this.#setTaskError.set(null);

    return this.#http.post<String>(`${this.#url()}task`, description ).pipe(shareReplay(),
    tap( () => this.#setCreateTask.set("Tarefa adicionada com sucesso")),
    catchError( (error: HttpErrorResponse) => {
      this.#setTaskError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpDeleteTaskId$(id: number): Observable<any>{
    return this.#http.delete(`${this.#url()}task/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setTaskError.set(error.error.message);
      return throwError(() => error);
    } ))
  }

  // END TASKS
}
