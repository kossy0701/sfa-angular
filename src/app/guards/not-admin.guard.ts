import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.validateToken().pipe(
      map((res: any) => {
        if (res.data.administrator) {
          return true;
        } else {
          return false;
        }
      }),
      catchError(err => {
        this.authService.onSignOut();
        this.router.navigate(['']);
        throw err;
      })
    );
  }
}
