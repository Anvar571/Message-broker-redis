import { Module } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
