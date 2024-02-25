import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  private todos = [
    {
      id: 1,
      title: 'Create Nest X Angular App',
      description: '',
      completed: true,
    },
    { id: 2, title: 'Add Todo Feature', description: '', completed: false },
    {
      id: 3,
      title: 'Add Todo List Feature',
      description: '',
      completed: false,
    },
    {
      id: 4,
      title: 'Add Todo Form Feature',
      description: '',
      completed: false,
    },
    { id: 5, title: 'Add Todo Service', description: '', completed: false },
  ];

  async create(createTodoDto: CreateTodoDto) {
    const todo = new this.todoModel(createTodoDto);

    return todo.save();
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id },
      updateTodoDto,
      { new: true }
    );

    return todo;
  }

  remove(id: string) {
    this.todoModel.findOneAndDelete({ _id: id }).exec();
  }
}
