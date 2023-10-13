import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('todo')
export class TodoProcessor {
  @Process('todo-test')
  async processTodo(job: Job) {
    const id = job.data;
    console.log(id, 'queue');
  }
}