import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg: string;

  form: FormGroup;
  showEmailLogin;
  isResetPassword;
  isNewUser;
  
  constructor(private authService: AuthService, 
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.updateForm();
  }

  updateForm() {
    this.form = this.fb.group({
      'email': ['', Validators.required],
      'password': this.isResetPassword ? [] : ['', Validators.required]
    });
  }

  showEmailLoginForm() {
    this.showEmailLogin = true;
    this.isNewUser = false;
  }

  hideEmailLoginForm() {
    this.showEmailLogin = false;
  }

  showResetPasswordForm() {
    this.isResetPassword = true;
    this.updateForm();
  }

  hideResetPasswordForm() {
    this.isResetPassword = false;
    this.isNewUser = false;
    this.updateForm();
  }

  public selectedTabChange($event) {
    this.isNewUser = $event.index > 0;
  }

  public cancelAction() {
    if (this.isResetPassword) {
      this.hideResetPasswordForm();
    } else {
      this.hideEmailLoginForm();
    }
    this.errorMsg = null;
  }

  loginEmail() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    if (this.isNewUser) {
      this.authService.createAccountWithEmail(email, password).then(() => {
        this.dialogRef.close();
      }).catch(err => {
        this.errorMsg = err.message;
      });
    } else {
      this.authService.signInWithEmail(email, password).then(() => {
        this.dialogRef.close();
      }).catch(err => {
        this.errorMsg = err.message;
      });
    }
  }

  resetPassword() {
    const email = this.form.get('email').value;
    this.authService.resetPassword(email).then(() => {
      this.hideResetPasswordForm();
      const dialogConfig = new MatDialogConfig();
      // dialogConfig.data = {
      //     title: "Reset Password Email Sent",
      //     description: AppConstants.RESET_EMAIL_SENT,
      //     yesButtonName: "OK"
      // }
      // this.dialog.open(YesNoComponent, dialogConfig);
    }).catch(err => {
      this.errorMsg = err.message;
    })
  }  

}
