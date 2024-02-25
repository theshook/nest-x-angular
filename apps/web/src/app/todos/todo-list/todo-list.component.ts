import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'nest-x-angular-todo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  @Output() editTodo = new EventEmitter<Todo>();
  subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.subscription = this.todoService.todos$.subscribe((todos) => {
      this.todos = todos as unknown[] as Todo[];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(todo: Todo) {
    this.todoService.setIsEdit(true);
    this.editTodo.emit(todo);
  }

  completed(todo: Todo) {
    this.todoService.update({...todo, completed: !todo.completed});
  }

  delete(id: string) {
    this.todoService.delete(id);
  }
}
