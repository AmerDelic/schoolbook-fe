import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.less']
})
export class NewUserModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  public userForm: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      profileImageUrl: [''],
      role: ['', Validators.required]
    });
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  onSubmit(): void {
    console.log('inside outter onSubmit()')
    if (this.userForm.valid) {
      console.log('inside inner onSubmit()')
      this.toastr.info('Should call service at this point')
      // this.userService.addUser(this.userForm);
    } else {
      this.toastr.error('Missing required field')
    }

  }
}
