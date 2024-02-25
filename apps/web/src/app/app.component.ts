import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoComponent } from './todos/todo.component';

@Component({
  standalone: true,
  imports: [TodoComponent, RouterModule],
  selector: 'nest-x-angular-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web';
}
