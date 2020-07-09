import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../utils/snack-bar.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  loading = false;
  @ViewChild('fileInput') fileInput;

  constructor(private userService: UserService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  importUsersFromCsv(): void {
    this.fileInput.nativeElement.click();
  }

  import(): void {
    this.loading = true;
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.userService.importUsersFromCsv(fileBrowser.files[0]).subscribe(data => {
        this.users = data;
        this.snackBarService.openSnackBar('アップロードに成功しました。', 'OK');
        this.loading = false;
      }, err => {
        this.snackBarService.openSnackBar('アップロードに失敗しました。', 'OK');
        this.loading = false;
      });
    }
  }
}
