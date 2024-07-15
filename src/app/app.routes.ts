import { Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login/loginPage.component';
import { PageSPAComponent } from './pages/page-spa/page-spa.component';

import { ContractPdfComponent } from './moduleContract/pdf-contract/contract-pdf/contract-pdf.component';
import { authorizationGuard } from './config/guard/authorization.guard';



export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'store/dashboard'
    },
    {
        path: 'store',
        pathMatch: 'full',
        redirectTo: 'store/dashboard'
    },
    {
        path: 'store',
        component: PageSPAComponent,
        canMatch: [authorizationGuard],
        loadChildren: () => import('./pages/app.routes').then((r) => r.routesStore),
    },
    
    {
        path: 'login',
        component: LoginPageComponent,
    
    },
    {
        path: 'store/orcamento/pdf/:id',
        component: ContractPdfComponent,
        canMatch: [authorizationGuard],
    },

 
];
