import { Routes } from '@angular/router';

import { ContractDetailsComponent } from './moduleContract/components/contract-details/contract-details.component';

import { EditCategoryComponent } from './moduleCategory/components/edit-category/edit-category.component';
import { CategoryEditComponent } from './modules/dashboard/pages/category-edit/category-edit.component';
import { ListItemComponent } from './moduleItem/components/list-item/list-item.component';
import { ItemComponent } from './moduleItem/components/item/item.component';
import { EditClientComponent } from './moduleClient/components/edit-client/edit-client.component';
import { LayoutDashboardComponent } from './moduleDashboard/components/layout-dashboard/layout-dashboard.component';
import { ListClientComponent } from './moduleClient/components/list-client/list-client.component';
import { FormRegisterClientComponent } from './moduleClient/components/form-register-client/form-register-client.component';
import { ListContractComponent } from './moduleContract/components/list-contract/list-contract.component';
import { RegisterContractComponent } from './moduleContract/components/register-contract/register-contract.component';
import { CategoryListComponent } from './moduleCategory/components/category-list/category-list.component';
import { CreateCategoryComponent } from './moduleCategory/components/create-category/create-category.component';
import { TemplateAdminComponent } from './moduleAdmin/components/template-admin/template-admin.component';
import { EditItemComponent } from './moduleItem/components/edit-item/edit-item.component';
import { LoginComponent } from './moduleLogin/components/login/login.component';
import { LoginPageComponent } from './pages/login/loginPage.component';
import { PageSPAComponent } from './pages/page-spa/page-spa.component';
import { HomeDashboardComponent } from './modules/dashboard/pages/home-dashboard/home-dashboard.component';
import { authorizationGuard } from './guard/authorization.guard';



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
    
    }

 
];
