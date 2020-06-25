import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInData } from 'angular-token';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInData: SignInData = {} as SignInData;

  constructor(private router: Router, public authService: AuthService, public messageService: MessageService) { }

  ngOnInit(): void {}

  handleSignIn() {
    this.authService.onSignIn(this.signInData).subscribe(res => {
      if (res.status === 200) {
        this.signInData.login = null;
        this.signInData.password = null;
        this.router.navigate(['/customers']);
      } else {
        this.messageService.notify(res);
      }
    });
  }
}
