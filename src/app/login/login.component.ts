import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HeaderType } from '../enum/header-type.enum';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
      this.toastr.success("Welcome back")
    } else {
      this.router.navigateByUrl('/login')
      this.toastr.warning("Please log in")
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    const subscription = this.authService.login(user).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        const token = response.headers.get(HeaderType.JWT_TOKEN);
        const user = response.body;
        if (token !== null && user !== null) {
          this.authService.saveToken(token);
          this.authService.addUserToCache(user);
          this.router.navigateByUrl('/user/management');
        } else {
          this.showLoading = false;
          this.toastr.error('Invalid response from server');
        }
      },
      error: (errorResponse) => {
        this.toastr.error(errorResponse.error.message);
        this.showLoading = false;
      }
    });

    if (subscription != null) {
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
