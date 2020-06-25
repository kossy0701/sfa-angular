import { Component } from '@angular/core';
import { MessageService } from './services/message.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  testId: number;

  constructor(public messageService: MessageService, public authService: AuthService, private userService: UserService) {
    this.userService.getUser(1).subscribe(data => {
      this.testId = data.id;
    });
  }
}
