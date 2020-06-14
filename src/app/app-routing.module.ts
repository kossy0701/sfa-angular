import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'customers/:id',
    component: CustomerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
