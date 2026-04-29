import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  viewMode: 'grid' | 'list' = 'grid';
}
