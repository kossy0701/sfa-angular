import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  displayedColumns = ['ID', '属性', '名称', '郵便番号', '都道府県', '市町村', '住所1', '住所2'];
  newCustomer: Customer;
  @ViewChild('downloadLink') downloadLink;

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '250px',
      data: {contract_status: '', name: '', postal_code: '', prefecture_id: null, city: '', address1: '', address2: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.createCustomer(result).subscribe(data => {
          this.router.navigate(['/customers', data.id]);
        });
      }
    });
  }

  downloadCSV(): void {
    this.customerService.getCustomersCSV().subscribe(blob => {
      this.downloadLink.nativeElement.href = window.URL.createObjectURL(blob);
      this.downloadLink.nativeElement.click();
    });
  }
}
