// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// npm modules
import { AngularTokenModule } from 'angular-token';

// components
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';

// angular materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from 'src/environments/environment';
import { UsersComponent } from './components/users/users.component';
import { IpsComponent } from './components/ips/ips.component';
import { IpFormComponent } from './components/ip-form/ip-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    CustomersComponent,
    ToolbarComponent,
    CustomerComponent,
    LoginComponent,
    UsersComponent,
    IpsComponent,
    IpFormComponent,
    SidebarComponent,
    FooterComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularTokenModule.forRoot({
      apiBase: `${environment.apiBase}`
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AngularTokenModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
