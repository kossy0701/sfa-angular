import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
import { asyncData } from 'src/test';
import { HttpClientModule } from '@angular/common/http';
import { Contact } from '../models/contact';

describe('ContactService', () => {
  let contactService: ContactService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    contactService = TestBed.inject(ContactService);
  });

  it('getContacs(): Observable<Contact[]>', () => {
    const customerId = 1;
    const expectedContacts: Contact[] = [
      new Contact(1)
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedContacts));
    contactService.getContacts(customerId).subscribe(contacts => {
      expect(contacts).toEqual(expectedContacts, 'expected Contacts');
    });
  });
});

