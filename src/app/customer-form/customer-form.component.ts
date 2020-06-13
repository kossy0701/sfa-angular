import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
