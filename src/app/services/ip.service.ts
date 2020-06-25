import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ip } from '../models/ip';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private httpClient: HttpClient) { }

  getIps(): Observable<Ip[]> {
    return this.httpClient.get(`${environment.apiBase}/ips`).pipe(
      map((res: Ip[]) => {
        if (res) {
          return Object.keys(res).map((key: string) => {
            const keys = res[key];
            return new Ip(
              keys.id,
              keys.content,
              keys.setted_at
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
}
