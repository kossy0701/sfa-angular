import { Component, OnInit } from '@angular/core';
import { IpFormComponent } from '../ip-form/ip-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Ip } from '../../models/ip';
import { IpService } from 'src/app/services/ip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.scss']
})
export class IpsComponent implements OnInit {
  ips: Ip[];
  displayedColumns = ['IPアドレス', '設定日', '更新', '削除'];

  constructor(private ipService: IpService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.ipService.getIps().subscribe(data => {
      this.ips = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IpFormComponent, {
      height: '300px',
      width: '300px',
      data: {content: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ipService.createIp(result).subscribe(data => {
          this.router.navigate(['/ips', data.id]);
        });
      }
    });
  }

  updateDialog(ip: Ip): void {
    const dialogRef = this.dialog.open(IpFormComponent, {
      height: '300px',
      width: '300px',
      data: {id: ip.id, content: ip.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ipService.updateIp(result).subscribe(data => {
          ip.content = data.content;
        });
      }
    });
  }

  handleDelete(ip: Ip): void {
    if (confirm(`${ip.content}を削除してもよろしいですか？`)) {
      this.ipService.deleteIp(ip).subscribe(() => {
        this.ips = this.ips.filter(arr => arr.id !== ip.id);
      });
    }
  }
}
