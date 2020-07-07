import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer, CustomerForRequest } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loading = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  customers: Customer[];
  customerForRequest: CustomerForRequest = {
    contract_status: null,
    name: '',
    postal_code: '',
    prefecture_id: null,
    city: '',
    address1: '',
    address2: ''
  };
  displayedColumns = ['ID', '属性', '名称', '郵便番号', '都道府県', '市町村', '住所1', '住所2'];
  @ViewChild('downloadCsvLink') downloadCsvLink;
  @ViewChild('downloadZipLink') downloadZipLink;

  constructor(
    public dialog: MatDialog,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '250px',
      data: this.customerForRequest
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
    this.loading = true;
    this.customerService.getCustomersCSV().subscribe(blob => {
      this.downloadCsvLink.nativeElement.href = window.URL.createObjectURL(blob);
      this.downloadCsvLink.nativeElement.click();
      this.loading = false;
      this.snackBar.open('CSVダウンロードに成功しました。', 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    });
  }

  downloadZip(): void {
    this.loading = true;
    this.customerService.getCustomersZip().subscribe(blob => {
      this.downloadZipLink.nativeElement.href = window.URL.createObjectURL(blob);
      this.downloadZipLink.nativeElement.click();
      this.loading = false;
      this.snackBar.open('Zipファイルダウンロードに成功しました。', 'OK', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    });
  }

  isLoading(): string {
    return this.loading ? 'clearness' : '';
  }
}
