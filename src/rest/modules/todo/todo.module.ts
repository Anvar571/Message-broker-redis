import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { TodoService } from './todo.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.register({
      store: CACHE_MANAGER
    }),
    BullModule.registerQueue({
      name: 'todo'
    })
  ],
  controllers: [TodoController],
  providers: [
    TodoRepository,
    TodoService
  ]
})
export class TodoModule {}
