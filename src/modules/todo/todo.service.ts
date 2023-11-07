import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class TodoService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) { }
  @CacheTTL(5)
  async findAll() {
    const cacheValue = await this.cacheManager.get('find_all');
    if (cacheValue) {
      return cacheValue
    }
    const result = await this.knex.select().from('todo');
    await this.cacheManager.set('find_all', result);

    return result;
  }

  async findOne(id: number) {
    return this.knex('todo').where({ id })
  }

  async create(todo: CreateTodoDto) {
    const [res] = await this.knex('todo').insert(todo).returning('*');
    return res;
  }

  async update(id: number, todo: UpdateTodoDto) {
    return this.knex('todo').where({ id }).update(todo);
  }

  async delete(id: number) {
    return this.knex('todo').where({ id }).delete();
  }
}

