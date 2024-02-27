import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { ClientesComponent } from './modules/dashboard/pages/clientes/clientes.component';
import { ContractBudgetPageComponent } from './modules/dashboard/pages/contract-budget/contract-budget.component';
import { ItemPageComponent } from './modules/dashboard/pages/item-page/item-page.component';
import { ItemRegisterComponent } from './modules/dashboard/pages/item-register/item-register.component';


export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'clientes',
        component: ClientesComponent,
    },
    {
        path: 'orcamento',
        component: ContractBudgetPageComponent,
    },
    {
        path: 'item',
        component: ItemPageComponent,
    },
    {
        path: 'item/register',
        component: ItemRegisterComponent
    }
];
