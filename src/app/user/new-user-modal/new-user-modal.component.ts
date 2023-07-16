import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.less']
})
export class NewUserModalComponent implements OnInit, OnDestroy {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onSubmit(user: User): void {
    let subscription = this.userService.addUser(user).subscribe({
      next: (response: User) => {
        this.toastr.info(`Created user ${response.username}`);

      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(`${errorResponse.error.message}`);
      }
    });
    if (subscription != null) {
      this.subscriptions.push(subscription);
    }
  }
}
