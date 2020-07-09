import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerForRequest, CustomerForResponse } from '../models/customer';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  createCustomer(params: CustomerForRequest): Observable<Customer> {
    return this.httpClient.post(`${environment.apiBase}/customers`, params).pipe(
      map((res: CustomerForResponse) => {
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
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getCustomer(id): Observable<Customer> {
    return this.httpClient.get(`${environment.apiBase}/customers/${id}`).pipe(
      map((res: CustomerForResponse) => {
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
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getCustomersCSV(): Observable<Blob> {
    return this.httpClient.get(`${environment.apiBase}/customers/download`, {responseType: 'text'}).pipe(
      map((res: string) => {
        return new Blob([res], {type: 'text/csv'});
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getCustomersZip(): Observable<Blob> {
    return this.httpClient.get(`${environment.apiBase}/customers/download_zip`, {
      responseType: 'blob',
      headers: { Accept: 'application/zip' }
    }).pipe(
      map((res: Blob) => {
        return new Blob([res], {type: 'application/zip'});
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
