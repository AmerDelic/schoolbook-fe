import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CustomHttpResponse } from '../model/response/custom-http-response';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, OnDestroy {

  private titleSubject = new BehaviorSubject<String>('Users')
  public titleAction$ = this.titleSubject.asObservable();
  private subscriptions: Subscription[] = [];
  public users: User[] = [];
  public refreshing: boolean = false;
  public isCollapsed = true;
  public selectedUser: User | null = null;
  public createNewUser: boolean = false;

  showUserModal(user: User) {
    this.selectedUser = user;
  }

  refreshUsers() {
    this.createNewUser = false;
    this.getUsers(true);
  }

  showNewUserModal() {
    this.createNewUser = true;
  }

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    const subscription = this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.refreshing = false;
        this.toastr.info(`Found ${this.users.length} users`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message);
        this.refreshing = false;
      }
    });
    if (subscription != null) {
      this.subscriptions.push(subscription);
    }
  }

  public deleteUser(uniqueField: string | undefined): void {
    if (uniqueField) {
      const subscription = this.userService.deleteUser(uniqueField).subscribe({
        next: (response: CustomHttpResponse) => {
          this.toastr.info(`${response.message}`);
          this.getUsers(true);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.toastr.error(errorResponse.error.message);
        }
      })
      if (subscription != null) {
        this.subscriptions.push(subscription);
      }
      return;
    } else {
      this.toastr.error('No user selected');
    }
  }

}
