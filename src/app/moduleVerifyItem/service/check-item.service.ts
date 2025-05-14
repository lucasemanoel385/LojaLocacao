import { Injectable, inject, signal } from '@angular/core';
import { VerifyItemByDate } from '../interface/verifyItemByDate.interface';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ReturnVerifyItemByDate } from '../interface/returnVerifyItemByDate.interface';
import { Item } from '../../moduleItem/interface/Item';
import { ImgBuffer } from '../../moduleItem/service/imgBuffer';
import { Pageable } from '../../moduleItem/interface/Pageable';
import { ListItem } from '../../moduleItem/interface/ListItem';
import { ListItemCheck } from '../interface/listItemCheck.interface';
import { ItemsAvailable } from '../interface/ItemsAvailable.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckItemService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setVerify = signal<ReturnVerifyItemByDate | null>(null);
  get getVerify() {
    return this.#setVerify;
  }

  #setVerifyError = signal<string | null>(null);
  get getVerifyError() {
    return this.#setVerifyError;
  }

  #setItemListPage = signal<Pageable | null>(null);
  get getItemListPage() {
    return this.#setItemListPage.asReadonly();
  }
  #setItemList = signal<ItemsAvailable[] | null>(null);
  get getItemList() {
    return this.#setItemList;
  }

  #setItemError = signal<string | null>(null);
  get getItemError() {
    return this.#setItemError;
  }

  public httpCheckItem$(checkItem: VerifyItemByDate): Observable <ReturnVerifyItemByDate> {

    return this.#http.post<ReturnVerifyItemByDate>(`${this.#url()}itemContract`, checkItem).pipe(
      tap((res) => {
        this.#setVerify.set(res)
      }),
      catchError( (error: HttpErrorResponse) => {
        this.#setVerifyError.set(error.error)
        return throwError(() => error)
      })
    );
  }

  public httpGetItemsIfAvailable$(page?: number, search?: any): Observable <ListItemCheck> {

    var params = new HttpParams().set('page', page as number);
  
     //var params = new HttpParams().set('page', page as string).set('search', search as string);
     
     //O pipe é uma função dos Observable's para realizar composições de operadores da RxJS.
     return this.#http.post<ListItemCheck>(this.#url() + 'itemContract', search, { responseType: 'json', params }).pipe(shareReplay(),
     tap((res) => {
       const items: ItemsAvailable[] = [];
       res.content.forEach(a => {
         let item: ItemsAvailable = {
           cod: a.cod,
           reference: a.reference,
           name: a.name,
           quantityAvailable: a.quantityAvailable,
           status: a.status,
           dateStart: a.dateStart,
           dateFinal: a.dateFinal,
           contractId: a.contractId,
           nameClient: a.nameClient,
           image: ImgBuffer.prototype.base64ToArrayBuffer(a.image)}
         items.push(item);
         }
       );
        this.#setItemList.set(items);
       
       const page: Pageable = {
         numberOfElements: res.numberOfElements,
         totalElements: res.totalElements,
         totalPages: res.totalPages,
         size: res.size,
         page: res.page,
         number: res.number
       }
         this.#setItemListPage.set(page);
     }),
     catchError( (error: HttpErrorResponse) => {
       this.#setVerifyError.set(error.error);
       return throwError(() => error);
     })
     );
   }
}
