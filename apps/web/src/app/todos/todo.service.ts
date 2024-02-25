import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todoSubject.asObservable();
  private isEdit = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.getTodos();
  }

  getTodos() {
    this.http
      .get<Todo[]>('http://localhost:3000/api/todos')
      .subscribe((todos) => {
        this.todoSubject.next(todos);
      });
  }

  create(todo: Todo) {
    this.http
      .post<Todo>('http://localhost:3000/api/todos', todo)
      .subscribe((todo) => {
        const newTodo = this.todoSubject.value;
        newTodo.push(todo);

        this.todoSubject.next(newTodo);
      });
  }

  update(todo: Todo) {
    console.log(todo)
    this.http
      .put<Todo>(`http://localhost:3000/api/todos/${todo._id}`, todo)
      .subscribe((todo) => {
        const todos = this.todoSubject.value;
        const index = todos.findIndex((t) => t._id === todo._id);
        todos[index] = todo;

        this.todoSubject.next(todos);
      });
  }

  delete(id: string) {
    this.http.delete(`http://localhost:3000/api/todos/${id}`).subscribe(() => {
      const todos = this.todoSubject.value;
      const index = todos.findIndex((t) => t._id === id);
      todos.splice(index, 1);
      this.todoSubject.next(todos);
    });
  }

  setIsEdit(edit: boolean) {
    this.isEdit.next(edit);
  }

  getIsEdit(): Observable<boolean> {
    return this.isEdit.asObservable();
  }
}
