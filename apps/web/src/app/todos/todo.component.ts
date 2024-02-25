import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { Todo } from './todo.interface';

@Component({
  selector: 'nest-x-angular-todo',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  todo!: Todo;

  editTodo(todo: Todo) {
    this.todo = todo;
  }
}
