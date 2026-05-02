import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface UserModel {
  name: string;
  address: string;
  contact: string;
  gender: string;
  email: string;
}

@Component({
  selector: 'app-user-display',
  imports: [CommonModule],
  templateUrl: './user-display.html',
  styleUrl: './user-display.css',
})
export class UserDisplay {
  @Input() users: UserModel[] = [];
  @Output() editUser = new EventEmitter<{ user: UserModel; index: number }>();
  @Output() deleteUser = new EventEmitter<number>();

  viewMode: 'grid' | 'list' = 'grid';
  deleteConfirmIndex: number | null = null;

  onEdit(user: UserModel, index: number) {
    this.editUser.emit({ user, index });
  }

  onDeleteRequest(index: number) {
    this.deleteConfirmIndex = index;
  }

  onDeleteConfirm() {
    if (this.deleteConfirmIndex !== null) {
      this.deleteUser.emit(this.deleteConfirmIndex);
      this.deleteConfirmIndex = null;
    }
  }

  onDeleteCancel() {
    this.deleteConfirmIndex = null;
  }
}
