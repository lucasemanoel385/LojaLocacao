import { Injectable, inject, signal, Pipe } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, share, shareReplay, tap, throwError } from 'rxjs';

interface Ite {
  nome: string;
}

interface Item {
    content: Ite[];
    
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setItemList = signal<Ite[] | null>(null);
  get getItemList() {
    return this.#setItemList.asReadonly();
  }

  #setItemListError = signal<Item | null>(null);
  get getItemListError() {
    return this.#setItemListError.asReadonly();
  }
  
  public httpGetItems$(): Observable <Item> {

    this.#setItemList.set(null);
    this.#setItemListError.set(null);

    return this.#http.get<Item>(this.#url() + 'item?page=0&size=0').pipe(shareReplay(),
    tap((res) => this.#setItemList.set(res.content)),
    catchError( (error: HttpErrorResponse) => {
      this.#setItemListError.set(error.error.message);
      return throwError(() => error)}));
    /*return this.#http.get<Item[]>(this.#url() + 'item').pipe(shareReplay(),
    tap((res) => this.#setItemList.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setItemListError.set(error.error.message);
      return throwError(() => error);
     })
     );*/
  }


}


