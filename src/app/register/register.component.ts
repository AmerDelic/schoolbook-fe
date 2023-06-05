import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ){}
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public onRegister(user: User): void {
    this.showLoading = true;
    const subscription = this.authService.register(user).subscribe(
      {
        next: (response: User) => {
          this.router.navigateByUrl('/login');
          this.toastr.info(`User "' + ${response.username} + '" registered`);
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error.message);
        }
      }
    );
    if(subscription !== null) {
      this.subscriptions.push(subscription);
    }
  }

}
