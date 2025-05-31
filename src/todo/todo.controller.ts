import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/crate-todo.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Create a new todo list" })
    @ApiResponse({
        status: 200,
        description: "Todo Create successfully"
    })
    @ApiResponse({
        status: 500,
        description: "this is custom error "
    })
    async createTodo(@Body() createTodoDto: CreateTodoDto, @Request() req: any) {
        return this.todoService.createTodo(createTodoDto, req.user.id)
    }

    @Get("getAll")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all todo filst" })
    @ApiResponse({
        status: 200,
        description: "Todo list retrieved successfully",
    })
    @ApiResponse({
        status: 500,
        description: "Server error"
    })

    async getAllTodos() {
        return this.todoService.getAllTodo()
    }


    @Get("getById/:id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get Todo by ID" })
    @ApiResponse({
        status: 200,
        description: "Todo Single"
    })
    @ApiResponse({
        status: 400,
        description: "Internarl server error"
    })

    async getTodoById(@Param("id") id: string) {
        return this.todoService.getTodoById(id);
    }



    @Put("updateById/:id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "update Todo by ID" })
    @ApiResponse({
        status: 200,
        description: "Todo Update successful"
    })
    @ApiResponse({
        status: 400,
        description: "Internal server error"
    })

    async updateTodoById(@Param("id") id: string, @Body() createTodoDto: CreateTodoDto, @Request() req: any) {
        return this.todoService.updateTodoById(id, createTodoDto, req.user.id);
    }




    @Delete("delete/:id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Delete Todo" })
    @ApiResponse({
        status: 200,
        description: "Todo delete successfully"
    })
    @ApiResponse(
        {
            status: 500,
            description: "Internal serve error"
        }
    )

    async deleteTodo(@Param("id") id: string) {
        return this.todoService.deleteTodo(id)
    }



}
