import { Injectable, inject, signal } from '@angular/core';
import { Item } from '../interface/Item';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { shareReplay } from 'rxjs/internal/operators/shareReplay';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ItemUpdate } from '../interface/ItemUpdate';
import { ItemCreate } from '../interface/ItemCreate';
import { Pageable } from '../interface/Pageable';
import { ListItem } from '../interface/ListItem';
import { ImgBuffer } from './imgBuffer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setItemListPage = signal<Pageable | null>(null);
  get getItemListPage() {
    return this.#setItemListPage.asReadonly();
  }
  #setItemList = signal<Item[] | null>(null);
  get getItemList() {
    return this.#setItemList.asReadonly();
  }

  #setItemId = signal<Item | null>(null);
  get getItemId() {
    return this.#setItemId.asReadonly();
  }

  #setItemSucess = signal<string | null>(null);
  get getItemSucess() {
    return this.#setItemSucess;
  }

  #setItemError = signal<string | null>(null);
  get getItemError() {
    return this.#setItemError;
  }

  #setAllItemList = signal<Item[] | null>(null);
  get getAllItemList() {
    return this.#setAllItemList.asReadonly();
  }
  
  public httpGetItems$(page?: number, search?: string, filterCategorySearch?: string): Observable <ListItem> {

   var params ;
  
   if (page && search && filterCategorySearch) {
    params = new HttpParams().set('search', search).set('page', page).set('filterCategorySearch', filterCategorySearch);
 
   } else if (search && filterCategorySearch) {
    params = new HttpParams().set('search', search).set('filterCategorySearch', filterCategorySearch);

   } else {
      params = new HttpParams().set('page', page as number);
   }
    //var params = new HttpParams().set('page', page as string).set('search', search as string);
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<ListItem>(this.#url() + 'item', { responseType: 'json', params }).pipe(shareReplay(),
    tap((res) => {
      const items: Item[] = [];
      res.content.forEach(a => {
        let item: Item = {
          cod: a.cod,
          reference: a.reference,
          name: a.name,
          url: this.apiUrl() + a.cod.toString(),
          replacementValue: a.replacementValue,
          amount: a.quantity,
          category: a.category}
        items.push(item);
        }
      );
       this.#setItemList.set(items);
      
      const page: Pageable = {
        numberOfElements: res.numberOfElements,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        size: res.size,
        number: res.number
      }
        this.#setItemListPage.set(page);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setItemError.set(error.error.message);
      return throwError(() => error);
    })
    );
  }

  public httpGetAllItems$(filter: string): Observable <ListItem> {

    this.#setItemList.set(null);
    this.#setItemError.set(null);

    var params = new HttpParams().set('filter', filter);
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<ListItem>(this.#url() + 'item/filter', { responseType: 'json', params }).pipe(shareReplay(),
    tap((res) => {
      let b!: ArrayBuffer;
      const items: Item[] = [];
      res.content.forEach(a => {
        let item: Item = {
          cod: a.cod,
          reference: a.reference,
          name: a.name,
          url: this.apiUrl() + a.cod.toString(),
          replacementValue: a.replacementValue,
          amount: a.quantity,
          category: a.category}
        items.push(item);
        }
      );
       this.#setAllItemList.set(items);
       const page: Pageable = {
        numberOfElements: res.numberOfElements,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        size: res.size,
        number: res.number
      }
        this.#setItemListPage.set(page);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setItemError.set(error.error.message);
      console.log(error.error.message)
      return throwError(() => error);
    })
    );
  }

  public httpGetItemId$(id: string): Observable <Item> {

    this.#setItemError.set(null);
    
    //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
    return this.#http.get<Item>(`${this.#url()}item/${id}`, { responseType: 'json' }).pipe(shareReplay(),
    tap((res) => {
      let item: Item = {
        cod: res.cod,
        reference: res.reference,
        name: res.name,
        url: this.apiUrl() + res.cod.toString(),
        replacementValue: res.replacementValue,
        amount: res.quantity,
        category: res.category
      }
        this.#setItemId.set(item);
            }),
    catchError( (error: HttpErrorResponse) => {
      this.#setItemError.set(error.error);
   
      return throwError(() => error);
    })
    );
  }

  public httpUpdateItem$(item: ItemUpdate, img: any): Observable<HttpResponse<Item>> {

    this.#setItemError.set(null);

    const formData = new FormData();
    formData.append('file', img);
    
    formData.append('item', new Blob([JSON.stringify(item)], { type: 'application/json'}))
    return this.#http.patch<Item>(this.#url() + 'item', formData, {observe: 'response'}).pipe(
      tap((response) => this.#setItemSucess.set("Produto atualizado com sucesso!!!")),
      catchError( (error: HttpErrorResponse) => {
        this.#setItemError.set(error.error);
        return throwError(() => error)
      })
    );
  }

  public httpCreateItem$(item: ItemCreate, img: any): Observable <Item> {

    this.#setItemError.set(null);

    const formData = new FormData();
    formData.append('file', img);
    
    formData.append('item', new Blob([JSON.stringify(item)], { type: 'application/json'}))
    return this.#http.post<Item>(this.#url() + 'item', formData).pipe(
      shareReplay(),
      tap((res) => this.#setItemSucess.set("Produto criado com sucesso!!!")),
      catchError( (error: HttpErrorResponse) => {
        this.#setItemError.set(error.error)
        return throwError(() => error)
      })
    );
  }

  public httpDeleteItem$(id: number): Observable <any>{

    return this.#http.delete(`${this.#url()}item/${id}`).pipe(
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        this.#setItemError.set(error.error);
        return throwError(() => error);
      })
    )
  }

  private apiUrl(): String {
    const url = "image/view/"
    if(!navigator.onLine) {
      return environment.apiSecond + url;
    }
    return environment.api + url;
  }
}
