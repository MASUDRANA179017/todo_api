import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entity/todo.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/crate-todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private TodoRepository: Repository<Todo>,
        @InjectRepository(User)
        private UserRepository: Repository<User>
    ) { }

    async createTodo(crateTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
        const todoData = crateTodoDto;

        const user = await this.UserRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const todo = this.TodoRepository.create({
            ...CreateTodoDto,
            owner: user,
            createdAt: new Date(),
        });

        return this.TodoRepository.save(todo);
    }

    async getAllTodo(): Promise <Todo[]>{
        return this.TodoRepository.find({ relations:["owner"] })
    }


    async getTodoById(id: string): Promise<Todo>{
        const todo = await this.TodoRepository.findOne({where: {id: Number(id)}});
        if (!todo) {
            throw new Error (`Todo with ${id} not found`)
        }

        return todo;
    }


    async deleteTodo (id: string): Promise<void>{
        const todo = await this.TodoRepository.findOne({where: {id: Number(id)}});
        if(!todo){
            throw new Error(`Todo with ID ${id} not found`)
        }

        await this.TodoRepository.delete(id)
    }
}
