import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { DataCompany } from '../interface/dataCompany.interface';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { ImgBuffer } from '../../../moduleItem/service/imgBuffer';
import { GetDataCompany } from '../interface/getDataCompany.interface';
import { RegisterExepenses } from '../interface/RegisterExpenses.interface';
import { DataAccouting } from '../interface/DataAccouting.interface';
import { DataCommissionEmployee } from '../interface/DataComissionEmployee.interface';

@Injectable({
  providedIn: 'root'
})
export class DataCompanyService {
  
  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setGetComissionEmployee = signal<DataCommissionEmployee[] | null>(null);
  get getComissionEmployee() {
    return this.#setGetComissionEmployee.asReadonly();
  }

  #setGetCompany = signal<GetDataCompany | null>(null);
  get getCompany() {
    return this.#setGetCompany.asReadonly();
  }

  #setGetAccouting = signal<DataAccouting | null>(null);
  get getAccouting() {
    return this.#setGetAccouting;
  }

  #setMsgError = signal<String | null>(null);
  get getMsgError() {
    return this.#setMsgError;
  }

  #setMsgSuccess = signal<String | null>(null);
  get getMsgSuccess() {
    return this.#setMsgSuccess;
  }

  #setMsgErrorExpenses = signal<String | null>(null);
  get getMsgErrorExpenses() {
    return this.#setMsgErrorExpenses;
  }

  #setMsgSucessExpenses = signal<String | null>(null);
  get getMsgSucessExpenses() {
    return this.#setMsgSucessExpenses;
  }

  public httpUpdateDataCompany$(item: DataCompany, img: any): Observable <any> {

    const formData = new FormData();
    formData.append('file', img);
    
    formData.append('dataCompany', new Blob([JSON.stringify(item)], { type: 'application/json'}))
    return this.#http.put(this.#url() + 'data-company', formData ).pipe(
      tap(() => this.#setMsgSuccess.set("Salvo com sucesso")),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setMsgError.set(error.error.message)
        return throwError(() => error)
      })
    );
  }

  public httpSaveObservationCompany$(observation: string): Observable <any> {

    return this.#http.patch(`${this.#url()}data-company/observation`, observation ).pipe(
      tap(() => this.#setMsgSuccess.set("Salvo com sucesso")),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setMsgError.set(error.error.message)
        return throwError(() => error)
      })
    );
  }

  public httpSaveClausesCompany$(clauses: string): Observable <any> {

    return this.#http.patch(`${this.#url()}data-company/clauses`, clauses ).pipe(
      tap(() => this.#setMsgSuccess.set("Salvo com sucesso")),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setMsgError.set(error.error.message)
        return throwError(() => error)
      })
    );
  }

  public httpGetDataCompany$(): Observable <GetDataCompany> {
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<GetDataCompany>(`${this.#url()}data-company`, { responseType: 'json' }).pipe(shareReplay(),
    tap((res) => {
      res.imagem = ImgBuffer.prototype.base64ToArrayBuffer(res.imagem);
      this.#setGetCompany.set(res);
    }),shareReplay(),
    catchError( (error: HttpErrorResponse) => {
  
   
      return throwError(() => error);
    })
    );
  }

  
  public httpGetDataAccouting$(month: string): Observable <DataAccouting> {
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<DataAccouting>(`${this.#url()}data-company/accounting/${month}`, { responseType: 'json' }).pipe(shareReplay(),
    tap((res) => {
      this.#setGetAccouting.set(res);
    }),shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      console.log(error.error.message)
      return throwError(() => error);
    })
    );
  }

  public httpGetComissionEmployee$(month: string): Observable <DataCommissionEmployee[]> {
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<DataCommissionEmployee[]>(`${this.#url()}data-company/accounting/employee/${month}`, { responseType: 'json' }).pipe(shareReplay(),
    tap((res) => {
      this.#setGetComissionEmployee.set(res);
    }),shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      console.log(error.error.message)
      return throwError(() => error);
    })
    );
  }

  public httpRegisterExpenses$(expenses: RegisterExepenses): Observable <any> {
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.post<any>(`${this.#url()}data-company/accounting/expenses`, expenses).pipe(shareReplay(),
    tap((res) => {
      this.#setMsgSucessExpenses.set("Despesa salva com sucesso!!")
    }),shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setMsgErrorExpenses.set(error.error)
      return throwError(() => error);
    })
    );
  }

  public httpDeleteExpenses$(id: number): Observable <any> {
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.delete<any>(`${this.#url()}data-company/accounting/expenses/${id}`).pipe(shareReplay(),
    tap((res) => {
    }),shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      console.log(error.error.message)
      return throwError(() => error);
    })
    );
  }

}
