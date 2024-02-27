import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { retry, shareReplay, delay } from 'rxjs';

//Serve pra interceptar requisições e adicionar funções globais, como headers em cada requisição ou shareReplay pra evitar multicasting
export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = new HttpHeaders().set('x-vida-full-stack', 'dev');

  const reqClone = req.clone({ headers });
  console.log(req);
  return next(req).pipe(
    shareReplay(),
    // Retry caso ocorra algum problema de conexão ele faz a requisição novamente 2 vezes com 1 segundo de intervalo
    retry({ count: 2, delay: 1000 })
  );
};
