import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customer: Customer;
  contacts: Contact[];

  constructor(private customerService: CustomerService, private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id).subscribe(data => {
      this.customer = data;
    });
    this.contactService.getContacts(id).subscribe(data => {
      this.contacts = data;
    });
  }
}
