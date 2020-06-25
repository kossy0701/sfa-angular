import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  title = 'SFA';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  handleSignOut(): void {
    this.authService.onSignOut().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
