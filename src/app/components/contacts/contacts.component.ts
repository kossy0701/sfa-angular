import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() contacts: Contact[];
  displayedColumns = ['ID', '接触日', '目的', 'タイトル', '接触者'];

  constructor() { }

  ngOnInit(): void {
  }
}
