import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { Admin } from '../../services/classes';
import { AdminService } from '../../services/admin.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminLoginComponent implements OnInit {
  returnUrl: string;
  admin: Admin = new Admin();
  submitted = false;
  loading = false;
  invalid = false;
  invalidUsername = false;
  invalidPassword = false;
  error = false;
  err = {};

  constructor(
    private router: Router,
    private adminService: AdminService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Get return url from route parameters or default to Home
    this.returnUrl = this.adminService.returnUrl || '/admin';
  }

  login(user, isValid) {
    this.submitted = true;

    if (isValid) {
      this.loading = true;

      this.adminService.login(user)
        .subscribe(
          res => {
            this.loading = false;

            if (res.message === 'Login successful!') {
              this.hideError();

              // Redirect to saved URL or home
              this.router.navigateByUrl(this.returnUrl);
            } else {
              this.invalid = true;
              this.err = res.message;
            }
          },
          err => {
            this.loading = false;

            if (err.error.name === 'IncorrectUsernameError') {
              this.invalidUsername = true;
              this.invalid = true;
              this.err = 'Invalid username';
            } else if (err.error.name === 'IncorrectPasswordError') {
              this.invalidPassword = true;
              this.invalid = true;
              this.err = 'Invalid password';
            } else {
              this.showError();
            }
          }
        );
    }
    return false;
  }

  cancel() {
    this.router.navigate(['/']);
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.invalid = false;
    this.invalidUsername = false;
    this.invalidPassword = false;
    this.error = false;
  }
}
