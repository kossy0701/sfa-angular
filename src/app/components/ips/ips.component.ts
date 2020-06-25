import { Component, OnInit } from '@angular/core';
import { Ip } from '../../models/ip';
import { IpService } from 'src/app/services/ip.service';

@Component({
  selector: 'app-ips',
  templateUrl: './ips.component.html',
  styleUrls: ['./ips.component.scss']
})
export class IpsComponent implements OnInit {
  ips: Ip[];
  displayedColumns = ['IPアドレス', '設定日'];

  constructor(private ipService: IpService) { }

  ngOnInit(): void {
    this.ipService.getIps().subscribe(data => {
      this.ips = data;
    });
  }

}
