import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, CacheTTL } from '@nestjs/cache-manager';

@Injectable()
export class TodoService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly todoRepo: TodoRepository
  ) { }
  @CacheTTL(5)
  async findAll() {
    const cacheValue = await this.cacheManager.get('find_all');
    if (cacheValue) {
      return cacheValue
    }
    const result = await this.todoRepo.findAll();
    await this.cacheManager.set('find_all', result);

    return result;
  }

  async findOne(id: number) {
    return this.todoRepo.findOne(id);
  }

  async create(todo: CreateTodoDto) {
    const res = await this.todoRepo.create(todo);
    return res;
  }

  async update(id: number, todo: UpdateTodoDto) {
    return this.todoRepo.update(id, todo);
  }

  async delete(id: number) {
    return this.todoRepo.delete(id);
  }
}

