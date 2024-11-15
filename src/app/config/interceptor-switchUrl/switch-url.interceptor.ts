import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, timeout, TimeoutError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const switchUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(
      (error: HttpErrorResponse) => {
        if(!navigator.onLine || error.status === 0) {
          console.error('Erro de rede detectado: net::ERR_INTERNET_DISCONNECTED');
          const secondaryUrl = environment.apiSecond;
          
          // Modifica a URL na requisição original
          const newUrl = req.url.replace(environment.api, secondaryUrl);
      
          // Cria uma nova requisição clonando a original, mas com a URL substituída
          const fallbackReq = req.clone({
            url: newUrl
          });
          console.log(fallbackReq);
          // Retenta com a nova URL
          return next(fallbackReq);
        }
        return throwError(() => error);
      }
    )
  );
};
