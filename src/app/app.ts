import { Component, signal } from '@angular/core';
import { UserForm } from './components/user-form/user-form';

@Component({
  selector: 'app-root',
  imports: [UserForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-form-app');
}
