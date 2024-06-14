import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { DataCompany } from '../interface/dataCompany.interface';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { ImgBuffer } from '../../../moduleItem/service/imgBuffer';
import { GetDataCompany } from '../interface/getDataCompany.interface';

@Injectable({
  providedIn: 'root'
})
export class DataCompanyService {
  
  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setGetCompany = signal<GetDataCompany | null>(null);
  get getCompany() {
    return this.#setGetCompany.asReadonly();
  }

  #setMsgError = signal<String | null>(null);
  get getMsgError() {
    return this.#setMsgError;
  }

  #setMsgSucess = signal<String | null>(null);
  get getMsgSucess() {
    return this.#setMsgSucess;
  }

  public httpUpdateDataCompany$(item: DataCompany, img: any): Observable <any> {

    const formData = new FormData();
    formData.append('file', img);
    
    formData.append('dataCompany', new Blob([JSON.stringify(item)], { type: 'application/json'}))
    return this.#http.put(this.#url() + 'data-company', formData ).pipe(
      tap(() => this.#setMsgSucess.set("Salvo com sucesso")),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setMsgError.set(error.error.message)
        return throwError(() => error)
      })
    );
  }

  public httpSaveObservationCompany$(observation: string): Observable <any> {

    return this.#http.patch(`${this.#url()}data-company/observation`, observation ).pipe(
      tap(() => this.#setMsgSucess.set("Salvo com sucesso")),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setMsgError.set(error.error.message)
        return throwError(() => error)
      })
    );
  }

  public httpSaveClausesCompany$(clauses: string): Observable <any> {

    return this.#http.patch(`${this.#url()}data-company/clauses`, clauses ).pipe(
      tap(() => this.#setMsgSucess.set("Salvo com sucesso")),
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
}
