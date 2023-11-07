import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CacheTTL, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { TodoQueueTypes } from "src/rest/shared/enum";

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
    return result
  }

  async create(todo: CreateTodoDto) {
    const res = await this.queue.add(TodoQueueTypes.TODO_REPO, {
      type: TodoQueueTypes.TODO_CREATE,
      data: {
        data: todo
      }
    });

    return res.data.data.data
  }

  async update(id: number, todo: UpdateTodoDto) {
    const updateResult = this.queue.add(TodoQueueTypes.TODO_REPO, {
      type: TodoQueueTypes.TODO_UPDATE,
      data: {
        id,
        data: todo
      }
    });
    return updateResult;
  }

  async delete(id: number) {
    const deleteResult = this.queue.add(TodoQueueTypes.TODO_REPO, {
      type: TodoQueueTypes.TODO_UPDATE,
      data: {
        id
      }
    });

    return deleteResult;
  }
}