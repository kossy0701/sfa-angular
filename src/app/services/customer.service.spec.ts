import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import { asyncData } from 'src/test';
import { HttpClientModule } from '@angular/common/http';

describe('CustomerService', () => {
  let customerService: CustomerService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    customerService = TestBed.inject(CustomerService);
  });

  it('getCustomers(): Observable<Customer[]>', () => {
    const expectedCustomers: Customer[] = [
      new Customer(1, 'prospect', '(株)ナガイ', '123-4567', '東京都', '板橋区', '弥生町')
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedCustomers));
    customerService.getCustomers().subscribe(customers => {
      expect(customers).toEqual(expectedCustomers, 'expected Customers');
    });
  });
});
