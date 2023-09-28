import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Knex } from 'knex';

@Injectable()
export class TodoService {
  constructor(private readonly knex: Knex) {}

  async findAll() {
    return this.knex.select().from('todos');
  }

  async create(todo: CreateTodoDto) {
    return this.knex('todos').insert(todo);
  }

  async update(id: number, todo: UpdateTodoDto) {
    return this.knex('todos').where({ id }).update(todo);
  }

  async delete(id: number) {
    return this.knex('todos').where({ id }).delete();
  }
}

