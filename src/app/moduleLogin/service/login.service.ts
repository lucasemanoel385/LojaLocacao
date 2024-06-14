import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from '../interface/login';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { LoginToken } from '../interface/loginToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  #setAuthorization = signal<boolean | null>(null);

  #setLogin = signal<LoginToken | null>(null);
  get getLogin() {
    return this.#setLogin.asReadonly();
  }

  public httpLogin$(dataLogin: Login): Observable <LoginToken> {

    return this.#http.post<LoginToken>(`${this.#url()}login`, dataLogin).pipe(
      tap((res) => {
        console.log("Login sucessfo!!!");
        this.#setLogin.set(res);
      }),
      shareReplay(),
      catchError( (error: HttpErrorResponse) => {
        //this.#setItemError.set(error.error);
        return throwError(() => error)
      })
    );
  }

}
