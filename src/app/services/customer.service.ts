import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get(`${environment.apiBase}/customers`).pipe(
      map((res: Customer[]) => {
        if (res) {
          return Object.keys(res).map((key: string) => {
            const keys = res[key];
            // tslint:disable-next-line: max-line-length
            return new Customer(keys.id, keys.constract_status, keys.postal_code, keys.prefecture_id, keys.city, keys.address1, keys.address2);
          });
        } else {
          return [];
        }
      })
    );
  }
}
