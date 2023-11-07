import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { TodoQueueTypes } from "../enum";
import { InjectKnex, Knex } from "nestjs-knex";
import { DelayTimeBySaveData } from '../decorators/timer';

@Processor('todo')
export class TodoProcessor {
  constructor(@InjectKnex() private readonly knex: Knex) { }

  @Process(TodoQueueTypes.TODO_REPO)
  @DelayTimeBySaveData()
  async processTodo(job: Job) {
    const jobType = job.data.type;
    switch (jobType) {
      case TodoQueueTypes.TODO_CREATE:
        await this.knex('todo').insert(job.data.data.data).returning('*');
        break;
      case TodoQueueTypes.TODO_UPDATE:
        await this.knex('todo').where({ id: job.data.data.id }).update(job.data.data.data);
        break;
      case TodoQueueTypes.TODO_DELETE:
        await this.knex('todo').where({ id: job.data.data.id }).del();
        break;
      default:
        return console.log('lorem');
    }
  }
}