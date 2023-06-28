import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.less']
})
export class UserModalComponent {

  @Input() user: User | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
