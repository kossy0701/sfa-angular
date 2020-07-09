import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ip-form',
  templateUrl: './ip-form.component.html',
  styleUrls: ['./ip-form.component.scss']
})
export class IpFormComponent implements OnInit {
  readonly networkAddressPattern: string = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])[¥.]){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'; // for validation

  constructor(
    public dialogRef: MatDialogRef<IpFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {content: ''}
  ) {}

  ngOnInit(): void {
  }
}
