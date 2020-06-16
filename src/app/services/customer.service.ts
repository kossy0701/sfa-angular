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
            return new Customer(
              keys.id,
              keys.contract_status,
              keys.name,
              keys.postal_code,
              keys.prefecture_name,
              keys.city,
              keys.address1,
              keys.address2
            );
          });
        } else {
          return [];
        }
      })
    );
  }

  createCustomer(params): Observable<Customer> {
    return this.httpClient.post(`${environment.apiBase}/customers`, params).pipe(
      map((res: any) => {
        return new Customer(
          res.id,
          res.contract_status,
          res.name,
          res.postal_code,
          res.prefecture_name,
          res.city,
          res.address1,
          res.address2
        );
      })
    );
  }

  getCustomer(id): Observable<Customer> {
    return this.httpClient.get(`${environment.apiBase}/customers/${id}`).pipe(
      map((res: any) => {
        return new Customer(
          res.id,
          res.contract_status,
          res.name,
          res.postal_code,
          res.prefecture_name,
          res.city,
          res.address1,
          res.address2
        );
      })
    );
  }
}
