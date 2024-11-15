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
import { PaymentsList } from '../interface/PaymentsList';
import { ContractListWithPage } from '../interface/ContractListWIthPage.interface';
import { Pageable } from '../../moduleItem/interface/Pageable';


@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setListContractPage = signal<Pageable | null>(null);
  get getListContractPage() {
    return this.#setListContractPage.asReadonly();
  }

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

  #setContractPaymentMsgSucess = signal<String | null>(null);
  get getContractPaymentMsgSucess() {
    return this.#setContractPaymentMsgSucess;
  }

  #setContractPaymentMsgError = signal<String | null>(null);
  get getContractPaymentMsgError() {
    return this.#setContractPaymentMsgError;
  }

  
  #setContractPayment = signal<PaymentsList[] | null>(null);
  get getContractPayment() {
    return this.#setContractPayment;
  }


  #setContractCreateError = signal<ContractList | null>(null);
  get getContractCreateError() {
    return this.#setContractCreateError;
  }

  public httpGetContractsByCode(search?: string): Observable<ContractList[]> {

    return this.#http.get<ContractList[]>(`${this.#url()}contract/cod/${search}`).pipe(shareReplay(), 
    tap( (res) => {
      console.log(res);
      this.#setListContract.set(res);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setListContractError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpGetContracts(search?: string, page?: number): Observable<ContractListWithPage> {

    var params ;
  
    if (page && search) {
     params = new HttpParams().set('search', search).set('page', page);
  
    } else if (search) {
 
     params = new HttpParams().set('search', search);
    } else {
 
       params = new HttpParams().set('page', page as number);
    }

    return this.#http.get<ContractListWithPage>(`${this.#url()}contract`, {params}).pipe(shareReplay(), 
    tap( (res) => {
      this.#setListContract.set(res.content);
      const page: Pageable = {
        numberOfElements: res.numberOfElements,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        size: res.size,
        number: res.number
      }
      this.#setListContractPage.set(page);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setListContractError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetContractId(id: number): Observable<ContractId>{
    
    this.#setContractId.set(null);

    return this.#http.get<ContractId>(`${this.#url()}contract/${id}`).pipe(shareReplay(), 
    tap( (res) => {
      res.items = res.items.map((i) => {
        let itens: ContractItens = {
          id: i.id,
          cod: i.cod,
          amount: i.amount,
          imagem: ImgBuffer.prototype.base64ToArrayBuffer(i.imagem),
          name: i.name,
          value: i.value,
          valueReplacement: i.valueReplacement,
          valueTotal: i.valueTotal
        }
        return itens;
      })
      
      this.#setContractId.set(res)
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractIdError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpCreateContract(contract: ContractCreate): Observable<any>{

    this.#setContractCreateError.set(null);
    this.#setContractMsgSucess.set(null);

    return this.#http.post<any>(`${this.#url()}contract`, contract ).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractCreate.set(res);
      this.#setContractMsgSucess.set("Contrato salvo com sucesso");}),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractCreateError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpEditContract(contract: ContractEdit): Observable<ContractId>{

    this.#setContractCreateError.set(null);
    this.#setContractMsgSucess.set(null);

    return this.#http.patch<ContractId>(`${this.#url()}contract`, contract ).pipe(shareReplay(),
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

    return this.#http.patch<any>(`${this.#url()}contract/situation`, situation ).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractMsgSucess.set("Contrato reservado com sucesso");}),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractCreateError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpPaymentsContract$(id: string, payment: any): Observable<any>{
  
    this.#setContractPaymentMsgError.set(null);
    this.#setContractPaymentMsgSucess.set(null);
    this.#setContractPayment.set(null);

    return this.#http.patch<any>(`${this.#url()}contract/payment/${id}`, payment ).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractPayment.set(res);
      this.#setContractPaymentMsgSucess.set("Pagamento salvo com sucesso!!!");
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractPaymentMsgError.set(error.error);
      return throwError(() => error);
    }))
  }

  
  public httpGetPaymentsContract$(id: string): Observable<PaymentsList[]>{
  
    return this.#http.get<PaymentsList[]>(`${this.#url()}contract/payment/${id}`).pipe(shareReplay(),
    tap( (res) => {
      this.#setContractPayment.set(res);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractPaymentMsgError.set(error.error);
      return throwError(() => error);
    }))
  }
  

  public httpDeleteContractId(id: number): Observable<any>{
    return this.#http.delete(`${this.#url()}contract/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setContractDeleteError.set(error.error.message);
      return throwError(() => error);
    } ))
  }
}
