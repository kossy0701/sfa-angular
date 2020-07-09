import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../utils/snack-bar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  title = 'SFA';

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  handleSignOut(): void {
    this.authService.onSignOut().subscribe(() => {
      this.router.navigate(['/login']);
      this.snackBarService.openSnackBar('ログアウトに成功しました。', 'OK');
    }, err => {
      this.snackBarService.openSnackBar('原因不明のエラーが発生しました。', 'OK');
    });
  }
}
