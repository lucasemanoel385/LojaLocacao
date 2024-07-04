import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, catchError, share, shareReplay, tap, throwError } from 'rxjs';
import { CategoryCreate } from '../interface/categoryCreate.interface';
import { CategoryList } from '../interface/categoryList.interface';
import { CategoryPage } from '../interface/categoryPage.interface';
import { Pageable } from '../../moduleItem/interface/Pageable';

@Injectable({
  providedIn: 'root'
})
export class CategoryItemService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setCreateCategory = signal<String | null>(null);
  get getCreateCategory() {
    return this.#setCreateCategory;
  }

  #setCreateCategoryError = signal<string | null>(null);
  get getCreateCategoryError() {
    return this.#setCreateCategoryError;
  }

  #setCategoryId = signal<CategoryCreate | null>(null);
  get getCategoryId() {
    return this.#setCategoryId;
  }

  #setCategoryIdError = signal<string | null>(null);
  get getCategoryIdError() {
    return this.#setCategoryId;
  }

  #setListCategoryPage = signal<Pageable | null>(null);
  get getListCategoryPage() {
    return this.#setListCategoryPage.asReadonly();
  }

  #setListCategory = signal<CategoryList[] | null>(null);
  get getListCategory() {
    return this.#setListCategory.asReadonly();
  }

  #setListAllCategory = signal<CategoryList[] | null>(null);
  get getListAllCategory() {
    return this.#setListAllCategory;
  }

  #setListCategoryError = signal<CategoryList | null>(null);
  get getListCategoryError() {
    return this.#setListCategoryError.asReadonly();
  }

  #setDeleteCategoryError = signal<string | null>(null);
  get getDeleteCategoryError() {
    return this.#setDeleteCategoryError;
  }

  public httpCreateCategory(category: string): Observable<CategoryCreate> {

    return this.#http.post<CategoryCreate>(`${this.#url()}categoria`, category).pipe(shareReplay(),
    tap( (res) => this.#setCreateCategory.set("Categoria adicionada com Sucesso!!!")),
    catchError( (error: HttpErrorResponse) => {
      this.#setCreateCategoryError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpGetListCategory(search?: string, page?: number): Observable<CategoryPage> {

    var params ;
  
    if (page && search) {
     params = new HttpParams().set('search', search).set('page', page);
  
    } else if (search) {
 
     params = new HttpParams().set('search', search);
    } else {
 
       params = new HttpParams().set('page', page as number);
    }

    return this.#http.get<CategoryPage>(`${this.#url()}categoria`, {params}).pipe(shareReplay(),
    tap( (res) => {
      this.#setListCategory.set(res.content)
      const page: Pageable = {
        numberOfElements: res.numberOfElements,
        totalElements: res.totalElements,
        totalPages: res.totalPages,
        size: res.size,
        number: res.number
      }
      this.#setListCategoryPage.set(page);
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setListCategoryError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetListAllCategory(): Observable<CategoryPage> {

    return this.#http.get<CategoryPage>(`${this.#url()}categoria/all`).pipe(shareReplay(),
    tap( (res) => {
      this.#setListAllCategory.set(res.content)
    }),
    catchError( (error: HttpErrorResponse) => {
      this.#setListCategoryError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpGetCategoryId(id: number): Observable<CategoryCreate> {
    return this.#http.get<CategoryCreate>(`${this.#url()}categoria/${id}`).pipe(shareReplay(),
    tap( (res) => this.#setCategoryId.set(res)),
    catchError( (error: HttpErrorResponse) => {
      this.#setListCategoryError.set(error.error.message);
      return throwError(() => error);
    }))
  }

  public httpUpdateCategory(category: CategoryList): Observable<CategoryCreate> {
    return this.#http.patch<CategoryCreate>(`${this.#url()}categoria`, category).pipe(shareReplay(),
    tap( (res) => this.#setCreateCategory.set("Categoria atualizada com Sucesso!!!")),
    catchError( (error: HttpErrorResponse) => {
      this.#setCreateCategoryError.set(error.error);
      return throwError(() => error);
    }))
  }

  public httpDeleteCategory(id: number): Observable<any> {
    
    return this.#http.delete(`${this.#url()}categoria/${id}`).pipe(shareReplay(),
    catchError( (error: HttpErrorResponse) => {
      this.#setDeleteCategoryError.set(error.error);
      return throwError(() => error);
    }))
  }
}
