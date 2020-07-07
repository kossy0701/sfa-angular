import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'angular-token';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from '../../services/message.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInData: SignInData = {} as SignInData;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    public authService: AuthService,
    public messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  handleSignIn(): void {
    this.authService.onSignIn(this.signInData).subscribe(res => {
      if (res.status === 200) {
        this.signInData.login = null;
        this.signInData.password = null;
        this.router.navigate(['/customers']);
        this.snackBar.open('ログインに成功しました。', 'OK', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      } else {
        this.messageService.notify(res);
      }
    });
  }
}
