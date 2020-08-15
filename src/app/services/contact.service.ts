import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact, ContactForResponse } from '../models/contact';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {}

  getContacts(customerId: number): Observable<Contact[]> {
    return this.httpClient.get(`${environment.apiBase}/customers/${customerId}/contacts`).pipe(
      map((res: Contact[]) => {
        if (res) {
          return Object.keys(res).map((key: string) => {
            const keys = res[key];
            return new Contact(
              keys.id,
              keys.contacted_at,
              keys.way,
              keys.purpose,
              keys.subject,
              keys.content,
              keys.target,
              keys.createdAt
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

  createContact(customerId: number, params): Observable<Contact> {
    return this.httpClient.post(`${environment.apiBase}/customers/${customerId}/contacts`, params).pipe(
      map((res: ContactForResponse) => {
        return new Contact(
          res.id,
          res.contacted_at,
          res.way,
          res.purpose,
          res.subject,
          res.content,
          res.target,
          res.created_at
        );
      })
    );
  }
}
