import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepo: TodoRepository,
  ) {}
  
  async findAll() {
    return this.todoRepo.findAll();
  }

  async findOne(id: number) {
    return this.todoRepo.findOne(id);
  }

  async create(todo: CreateTodoDto) {
    return this.todoRepo.create(todo)
  }

  async update(id: number, todo: UpdateTodoDto) {
    return this.todoRepo.update(id, todo);
  }

  async delete(id: number) {
    return this.todoRepo.delete(id);
  }
}

