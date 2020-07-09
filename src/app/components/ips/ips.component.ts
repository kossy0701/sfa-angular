import { Component, OnInit } from '@angular/core';
import { IpFormComponent } from '../ip-form/ip-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Ip } from '../../models/ip';
import { IpService } from 'src/app/services/ip.service';
import { SnackBarService } from '../../utils/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.scss']
})
export class IpsComponent implements OnInit {
  loading = false;
  ips: Ip[];
  displayedColumns = ['IPアドレス', '設定日', '更新', '削除'];

  constructor(private ipService: IpService, public dialog: MatDialog, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.ipService.getIps().subscribe(data => {
      this.ips = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IpFormComponent, {
      height: '300px',
      width: '300px',
      data: { content: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result) {
        this.ipService.createIp(result).subscribe(data => {
          this.ips.push(data);
          this.snackBarService.openSnackBar('IPアドレスを追加しました。', 'OK');
          this.loading = false;
        }, err => {
          this.snackBarService.openSnackBar('IPアドレス設定に失敗しました。', 'OK');
          this.loading = false;
        });
      }
    });
  }

  updateDialog(ip: Ip): void {
    const dialogRef = this.dialog.open(IpFormComponent, {
      height: '300px',
      width: '300px',
      data: { id: ip.id, content: ip.content }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      if (result) {
        this.ipService.updateIp(result).subscribe(data => {
          ip.content = data.content;
          this.snackBarService.openSnackBar('IPアドレスを更新しました。', 'OK');
          this.loading = false;
        }, err => {
          this.snackBarService.openSnackBar('IPアドレス設定に失敗しました。', 'OK');
          this.loading = false;
        });
      }
    });
  }

  handleDelete(ip: Ip): void {
    if (confirm(`${ip.content}を削除してもよろしいですか？`)) {
      this.ipService.deleteIp(ip).subscribe(() => {
        this.ips = this.ips.filter(arr => arr.id !== ip.id);
        this.snackBarService.openSnackBar('IPアドレス削除に成功しました。', 'OK');
      }, err => {
        this.snackBarService.openSnackBar('IPアドレス削除に失敗しました。', 'OK');
      });
    }
  }
}
