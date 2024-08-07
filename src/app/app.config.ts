import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { tokenJWTInterceptor } from './config/interceptor/token-jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
//import { WebsocketService } from './config/webSocket/webSocket.service';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), 
    
    // Isso faz com que as rotas filhas sempre tenham acesso a parametros definidos da rota pai
    withRouterConfig(
      {
        paramsInheritanceStrategy: 'always'
      }
    )),
    provideHttpClient(withInterceptors([tokenJWTInterceptor])),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-Br' }, provideAnimationsAsync('noop'),
    importProvidersFrom(MatNativeDateModule),
    //{provide: 'IWebSocket', useClass: WebsocketService}
  ]
};
