import { Component, signal } from '@angular/core';
import { AuthForm } from './components/auth-form/auth-form';

@Component({
  selector: 'app-root',
  imports: [AuthForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-form-app');
}
