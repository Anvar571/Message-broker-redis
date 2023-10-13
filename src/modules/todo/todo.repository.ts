import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CacheTTL, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

export class TodoRepository {
  constructor(
    @InjectQueue('todo') private readonly queue: Queue,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectKnex() private readonly knex: Knex
  ) { }

  @CacheTTL(50)
  async findAll() {
    const cacheValue = await this.cacheManager.get('todo_findall');
    if (cacheValue) {
      return cacheValue;
    }
    const result = await this.knex.select().from('todo');
    await this.cacheManager.set('todo_findall', result);
    return result
  }

  async findOne(id: number) {
    const result = await this.knex('todo').where({ id }).first();
    await this.cacheManager.set('todo_findone', result);
    await this.queue.add('todo-test', result);
    return result
  }

  async create(todo: CreateTodoDto) {
    const [res] = await this.knex('todo').insert(todo).returning('*');
    return res
  }

  async update(id: number, todo: UpdateTodoDto) {
    return this.knex('todo').where({ id }).update(todo);
  }

  async delete(id: number) {
    return this.knex('todo').where({ id }).delete();
  }
}