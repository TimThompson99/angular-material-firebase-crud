import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { LoginComponent } from './components/dialogs/login/login.component';
import { AuthService } from './shared/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  opened = false;
  userDetails: any;
  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUserDetails.subscribe(user => {
      this.userDetails = user;
    })
  }

  showLogin() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = false
    this.dialog.open(LoginComponent, dialogConfig)
  }

  async logout() {
    await this.authService.signOut();
  }

}
