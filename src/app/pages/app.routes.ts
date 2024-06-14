import { Routes } from '@angular/router';
import { LayoutDashboardComponent } from '../moduleDashboard/components/layout-dashboard/layout-dashboard.component';
import { ListClientComponent } from '../moduleClient/components/list-client/list-client.component';
import { FormRegisterClientComponent } from '../moduleClient/components/form-register-client/form-register-client.component';
import { EditClientComponent } from '../moduleClient/components/edit-client/edit-client.component';
import { ListContractComponent } from '../moduleContract/components/list-contract/list-contract.component';
import { RegisterContractComponent } from '../moduleContract/components/register-contract/register-contract.component';
import { ContractDetailsComponent } from '../moduleContract/components/contract-details/contract-details.component';
import { ListItemComponent } from '../moduleItem/components/list-item/list-item.component';
import { ItemComponent } from '../moduleItem/components/item/item.component';
import { EditItemComponent } from '../moduleItem/components/edit-item/edit-item.component';
import { CategoryListComponent } from '../moduleCategory/components/category-list/category-list.component';
import { EditCategoryComponent } from '../moduleCategory/components/edit-category/edit-category.component';
import { CreateCategoryComponent } from '../moduleCategory/components/create-category/create-category.component';
import { TemplateAdminComponent } from '../moduleAdmin/components/template-admin/template-admin.component';




export const routesStore: Routes = [

            {
                path: 'dashboard',
                component: LayoutDashboardComponent,
            },
            {
                path: 'clients',
                component: ListClientComponent
            },
            {
                path: 'clients/register',
                component: FormRegisterClientComponent,
            },
            {
                path: 'clients/edit/:id',
                component: EditClientComponent,
            },
            {
                path: 'orcamento',
                component: ListContractComponent
            },
            {
                path: 'orcamento/register',
                component : RegisterContractComponent,
            },
            {
                path: 'orcamento/edit/:id',
                component: ContractDetailsComponent
            },
            {
                path: 'item',
                component: ListItemComponent,
            },
            {
                path: 'item/register',
                component: ItemComponent
            },
            {
                path: 'item/edit/:id',
                component: EditItemComponent
            },
            {
                path: 'category',
                component: CategoryListComponent
            },
            {
                path: 'category/edit/:id',
                component: EditCategoryComponent
            },
            {
                path: 'category/register',
                component: CreateCategoryComponent
            },
            {
                path: 'admin/edit',
                pathMatch: 'full',
                redirectTo: 'admin/edit/data'
            },
            {
                path: 'admin/edit',
                component: TemplateAdminComponent,
            },
            {
                path: 'admin/edit/data',
                component: TemplateAdminComponent
            },
            {
                path: 'admin/edit/budget',
                component: TemplateAdminComponent
            },
            {
                path: 'admin/edit/contract',
                component: TemplateAdminComponent
            },
            {
                path: 'admin/edit/accounting',
                component: TemplateAdminComponent
            }
];
