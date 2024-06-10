import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { ContractList } from '../interface/contractList.interface';
import { ContractCreate } from '../interface/contractCreate.interface';
import { ContractId } from '../interface/contractId.interface';
import { ContractItens } from '../interface/contractItens.interface';
import { ImgBuffer } from '../../moduleItem/service/imgBuffer';
import { ContractEdit } from '../interface/contractEdit.interface';
import { ChangeSituation } from '../interface/changeSituation.interface';


@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setListContract = signal<ContractList[] | null>(null);
  get getListContract() {
    return this.#setListContract.asReadonly();
  }

  #setListContractError = signal<ContractList | null>(null);
  get getListContractError() {
    return this.#setListContractError.asReadonly();
  }

  #setContractId = signal<ContractId | null>(null);
  get getContractId() {
    return this.#setContractId;
  }

  #setContractIdError = signal<ContractList | null>(null);
  get getContractIdError() {
    return this.#setContractIdError.asReadonly();
  }

  #setContractDeleteError = signal<ContractList | null>(null);
  get getContractDeleteError() {
    return this.#setContractDeleteError.asReadonly();
  }

  #setContractCreate = signal<ContractCreate | null>(null);
  get getContractCreate() {
    return this.#setContractCreate.asReadonly();
  }

  #setContractMsgSucess = signal<String | null>(null);
  get getContractSucess() {
    return this.#setContractMsgSucess;
  }

  #setContractCreateError = signal<ContractList | null>(null);
  get getContractCreateError() {
    return this.#setContractCreateError;
  }
  

  public httpGetContracts(search?: string): Observable<any> {

    var params;
    
    if (search) {
      params = new HttpParams().set('search', search);
    }

    return this.#http.get<any>(`${this.#url()}contrato`, {params}).pipe(shareReplay(), 
    tap( (res) => this.#setListContract.set(res.content)),
    catchError( (error: HttpErrorResponse) => {
      this.#setListContractError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetContractId(id: number): Observable<ContractId>{
    
    return this.#http.get<ContractId>(`${this.#url()}contrato/${id}`).pipe(shareReplay(), 
    tap( (res) => {
      res.items = res.items.map((i) => {
        let itens: ContractItens = {
          id: i.id,
          cod: i.cod,
          amount: i.amount,
          imagem: ImgBuffer.prototype.base64ToArrayBuffer(i.imagem),
          name: i.name,
          value: i.value,
          valueTotal: i.valueTotal
        }
        return itens;
      })
      
      this.#setContractId.set(res)
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractIdError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpCreateContract(contract: ContractCreate): Observable<any>{

    this.#setContractCreateError.set(null);
    this.#setContractMsgSucess.set(null);

    return this.#http.post<any>(`${this.#url()}contrato`, contract ).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractCreate.set(res);
      this.#setContractMsgSucess.set("Contrato salvo com sucesso");}),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractCreateError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpEditContract(contract: ContractEdit): Observable<any>{

    this.#setContractCreateError.set(null);
    this.#setContractMsgSucess.set(null);

    return this.#http.patch<any>(`${this.#url()}contrato`, contract ).pipe(shareReplay(),
    tap( (res) => {

      this.#setContractMsgSucess.set("Contrato salvo com sucesso");}),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractCreateError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpEditSituationContract(situation: ChangeSituation): Observable<any>{

    this.#setContractCreateError.set(null);
    this.#setContractMsgSucess.set(null);

    return this.#http.patch<any>(`${this.#url()}contrato/situation`, situation ).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractMsgSucess.set("Contrato reservado com sucesso");}),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractCreateError.set(error.error);
      return throwError(() => error);
    }))
  }
  

  public httpDeleteContractId(id: number): Observable<any>{
    return this.#http.delete(`${this.#url()}contrato/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractDeleteError.set(error.error.message);
      return throwError(() => error);
    } ))
  }
}
