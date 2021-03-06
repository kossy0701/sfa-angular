import { Injectable } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MessageService } from './message.service';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInUserId: number;
  signInUserName: string;
  signInAdmin: boolean;

  constructor(public angularTokenService: AngularTokenService, private httpClient: HttpClient, private messageService: MessageService) {
    this.validateToken().subscribe(
      res => {
        if (res.success) {
          this.signInUserId = res.data.id;
          this.signInUserName = res.data.name;
          this.signInAdmin = res.data.administrator;
          return true;

        } else {
          return false;
        }
      },
      err => {
        return throwError(err);
      }
    );
  }

  validateToken(): Observable<ApiResponse> {
    return this.httpClient.get(`${environment.apiBase}/auth/validate_token`).pipe(
      map((res) => {
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  onSignIn(signInData): Observable<ApiResponse> {
    return this.angularTokenService.signIn(signInData).pipe(
      map((res) => {
        localStorage.setItem('accessToken', res.headers.get('access-token'));
        localStorage.setItem('cilent', res.headers.get('client'));
        localStorage.setItem('expiry', res.headers.get('expiry'));
        localStorage.setItem('uid', res.headers.get('uid'));
        this.signInUserId = res.body.data.id;
        this.signInUserName = res.body.data.name;
        this.signInAdmin = res.body.data.administrator;
        return res;
      }),
      catchError(err => {
        this.messageService.notify(this.messageService.message(err.statusText));
        return throwError(err);
      })
    );
  }

  onSignOut(): Observable<ApiResponse> {
    return this.angularTokenService.signOut().pipe(
      map(res => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('cilent');
        localStorage.removeItem('expiry');
        localStorage.removeItem('uid');
        this.signInUserId = null;
        this.signInUserName = null;
        this.signInAdmin = null;
        return res;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  currentAuthHeaders(): object {
    const authData = this.angularTokenService.currentAuthData;
    return {
      'access-token': authData.accessToken,
      'client':       authData.client,
      'expiry':       authData.expiry,
      'token-type':   authData.tokenType,
      'uid':          authData.uid
    };
  }
}
