import { Injectable, inject, signal } from '@angular/core';
import { ClientCreate } from '../interface/clientCreate.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { ClientList } from '../interface/clientList.interface';
import { ClientPage } from '../interface/clientPage.interface';
import { Cep } from '../interface/cep.interface';
import { UpdateClient } from '../interface/updateClient.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  #http = inject(HttpClient);
  #url = signal(environment.api);
  

  #setListClient = signal<ClientList[] | null>(null);
  get getListClient() {
    return this.#setListClient.asReadonly();
  }

  #setListClientError = signal<string | null>(null);
  get getListClientError() {
    return this.#setListClientError.asReadonly();
  }

  #setClientId = signal<ClientCreate | null>(null);
  get getClientId() {
    return this.#setClientId();
  }

  #setClientIdError = signal<string | null>(null);
  get getClientIdError() {
    return this.#setClientIdError.asReadonly();
  }

  #setClientDeleteError = signal<string | null>(null);
  get getClientDeleteError() {
    return this.#setClientDeleteError.asReadonly();
  }

  #setClientMsgSucess = signal<String | null>(null);
  get getClientMsgSucess() {
    return this.#setClientMsgSucess;
  }

  #setClientError = signal<string | null>(null);
  get getClientError() {
    return this.#setClientError;
  }

  public httpCreateClient(client: ClientCreate): Observable<ClientCreate>{
    console.log(client)
    return this.#http.post<ClientCreate>(`${this.#url()}cliente`, client ).pipe(shareReplay(),
    tap( (res) => this.#setClientMsgSucess.set("Cliente cadastrado com sucesso")),
    catchError( (error: HttpErrorResponse) => {
      this.#setClientError.set(error.error);
      return throwError(() => error);
    }))
  }
  
  public httpGetClient(search?: string): Observable<ClientPage> {

    var params;
    
    if (search) {
      params = new HttpParams().set('search', search);
    }

    return this.#http.get<ClientPage>(`${this.#url()}cliente`, {params}).pipe(shareReplay(), 
    tap( (res) => this.#setListClient.set(res.content)),
    catchError( (error: HttpErrorResponse) => {
      this.#setListClientError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetClientFilter(filter: string): Observable<ClientPage> {

    return this.#http.get<ClientPage>(`${this.#url()}cliente/filter?search=${filter}`).pipe(shareReplay(), 
    tap( (res) => this.#setListClient.set(res.content)),
    catchError( (error: HttpErrorResponse) => {
      this.#setListClientError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetClientId(id: string): Observable<ClientCreate>{
    
    return this.#http.get<ClientCreate>(`${this.#url()}cliente/${id}`).pipe(shareReplay(), 
    tap( (res) => this.#setClientId.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setClientIdError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpUpdateClient(client: UpdateClient): Observable<ClientCreate>{
    return this.#http.patch<ClientCreate>(`${this.#url()}cliente`, client ).pipe(shareReplay(),
    tap( (res) => this.#setClientMsgSucess.set("Cliente atualizado com sucesso!!!")),
    catchError( (error: HttpErrorResponse) => {
      this.#setClientError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpDeleteClientId(id: number): Observable<any>{
    return this.#http.delete(`${this.#url()}cliente/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setClientDeleteError.set(error.error.message);
      return throwError(() => error);
    } ))
  }

  #setCepClient = signal<Cep | null>(null);
  get getCepClient() {
    return this.#setCepClient.asReadonly();
  }

  public httpGetCep(cep: string): Observable<Cep>{
    
    return this.#http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`).pipe(shareReplay(), 
    tap( (res) => res),
    catchError( (error: HttpErrorResponse) => {
      this.#setClientIdError.set(error.error.message);
      return throwError(() => error);
    }))
  }
}
