import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../model/user';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.less'],
})
export class UserInfoModalComponent {

  @Input() user: User | null = null;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
