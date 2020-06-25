import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  notificationMessage: string = null;
  error = false;

  private clearMessage(): void {
    setTimeout(() => {
      this.notificationMessage = null;
    }, 5000);
  }

  notify(message, status = 'error') {
    this.error = (status === 'error');
    this.notificationMessage = message;
    this.clearMessage();
  }

  message(code= null): string {
    return {
      Unauthorized: 'メールアドレス、パスワードのいずれかが間違っています。'
    }[code];
  }

  constructor() { }
}
