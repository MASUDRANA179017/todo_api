import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { User } from 'src/entity/user.entity';
import { Todo } from 'src/entity/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo,User])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
