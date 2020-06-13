import { Component, OnInit } from '@angular/core';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  dataSource = [
    {
      id: 1,
      contractStatus: '見込み客',
      name: '渡辺鉄工所',
      postalCode: '〒173-0022',
      prefecture: '東京都',
      city: '板橋区',
      address: 'ときわ台1-32-1',
      address2: null
    },
    {
      id: 2,
      contractStatus: '見込み客',
      name: '渡辺鉄工所',
      postalCode: '〒173-0022',
      prefecture: '東京都',
      city: '板橋区',
      address: 'ときわ台1-32-1',
      address2: null
    },
  ];
  displayedColumns = ['ID', '属性', '名称', '郵便番号', '都道府県', '市町村', '住所1', '住所2'];

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result['id'] = 1;
      result['contractStatus'] = '既存客';
      result['postalCode'] = '012-3456';
      result['prefecture'] = '東京都';
      result['city'] = '板橋区';
      result['address'] = '弥生町41-5';
      result['address2'] = null;

      this.dataSource.push(result);
    });
  }

  ngOnInit(): void {}

}
