import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ManageShelfComponent } from './manage-shelf/manage-shelf.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { ManageStoresComponent } from './manage-stores/manage-stores.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
	 { path: 'manage-shelf', component: ManageShelfComponent },
    { path: 'manage-stock', component: ManageStockComponent },
    { path: 'manage-stores', component: ManageStoresComponent },
    { path: 'manage-users', component: ManageUsersComponent },
    { path: 'product-details', component: ProductDetailsComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);