import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer, CustomerForRequest } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../utils/snack-bar.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loading = false;
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
    private snackBarService: SnackBarService
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
        this.customerForRequest = result;
        this.customerService.createCustomer(this.customerForRequest).subscribe(data => {
          this.router.navigate(['/customers', data.id]);
          this.snackBarService.openSnackBar('顧客の追加に成功しました。', 'OK');
        }, err => {
          this.snackBarService.openSnackBar('顧客の追加に失敗しました。', 'OK');
        });
      }
    });
  }

  downloadCSV(): void {
    this.loading = true;
    this.customerService.getCustomersCSV().subscribe(blob => {
      this.downloadCsvLink.nativeElement.href = window.URL.createObjectURL(blob);
      this.downloadCsvLink.nativeElement.click();
      this.snackBarService.openSnackBar('CSVダウンロードに成功しました。', 'OK');
      this.loading = false;
    }, err => {
      this.snackBarService.openSnackBar('CSVダウンロードに失敗しました。', 'OK');
      this.loading = false;
    });
  }

  downloadZip(): void {
    this.loading = true;
    this.customerService.getCustomersZip().subscribe(blob => {
      this.downloadZipLink.nativeElement.href = window.URL.createObjectURL(blob);
      this.downloadZipLink.nativeElement.click();
      this.snackBarService.openSnackBar('Zipダウンロードに成功しました。', 'OK');
      this.loading = false;
    }, err => {
      this.snackBarService.openSnackBar('Zipダウンロードに失敗しました。', 'OK');
      this.loading = false;
    });
  }

  isLoading(): string {
    return this.loading ? 'clearness' : '';
  }
}
