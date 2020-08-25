import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserForResponse } from '../models/user';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get(`${environment.apiBase}/admin/users`).pipe(
      map((res: User[]) => {
        if (res) {
          return Object.keys(res).map((key: string) => {
            const keys = res[key];
            return new User(
              keys.id,
              keys.name,
              keys.last_name,
              keys.first_name,
              keys.last_name_kana,
              keys.first_name_kana,
              keys.email,
              keys.sex,
              keys.administrator,
              keys.disable,
              keys.prefecture_name,
              keys.image
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

  getUser(id): Observable<User> {
    return this.httpClient.get(`${environment.apiBase}/users/${id}`).pipe(
      map((res: UserForResponse) => {
        return new User(
          res.id,
          res.name,
          res.last_name,
          res.first_name,
          res.last_name_kana,
          res.first_name_kana,
          res.email,
          res.sex,
          res.administrator,
          res.disable,
          res.prefecture_name
        );
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  importUsersFromCsv(csv): Observable<User[]> {
    const formData = new FormData();
    formData.append('upload_file', csv);

    return this.httpClient.post(`${environment.apiBase}/admin/users/import`, formData).pipe(
      map((res: User[]) => {
        if (res) {
          return Object.keys(res).map((key: string) => {
            const keys = res[key];
            return new User(
              keys.id,
              keys.name,
              keys.last_name,
              keys.first_name,
              keys.last_name_kana,
              keys.first_name_kana,
              keys.email,
              keys.sex,
              keys.administrator,
              keys.disable,
              keys.prefecture_name
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
