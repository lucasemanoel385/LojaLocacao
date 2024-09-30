import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenJWTInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  if(localStorage.getItem('tokenJWT')) {
    const token = localStorage.getItem('tokenJWT');
  
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  
    return next(authReq).pipe(
      catchError( 
      (error: HttpErrorResponse) => {
        if(error.status === 403) {
          localStorage.clear();
          router.navigate(['../login'])
        }
        return throwError(() => error);
      }));
  }
  
  return next(req);
  
};