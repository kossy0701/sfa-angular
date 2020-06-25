import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users.component';
import { NotAdminGuard } from './guards/not-admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers/:id',
    component: CustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [NotAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
