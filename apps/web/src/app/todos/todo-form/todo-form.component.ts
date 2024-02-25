import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'nest-x-angular-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit, OnChanges {
  todoForm!: FormGroup;
  @Input() todo!: Todo;
  isEdit!: boolean;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.todoService.getIsEdit().subscribe((isEdit) => {
      this.isEdit = isEdit;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo'].currentValue) {
      this.todoForm.addControl('_id', this.formBuilder.control(''));
      this.todoForm.patchValue(changes['todo'].currentValue);
    }
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      completed: [false],
    });
  }

  submit() {
    if (this.todoForm.invalid) {
      return;
    }

    const todo: Todo = this.todoForm.value;

    if (this.isEdit) {
      this.todoService.update(todo);
      this.todoService.setIsEdit(!this.isEdit);
    } else {
      this.todoService.create(todo);
    }
    this.todoForm.reset();
  }
}
