import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Request } from "express";
  
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {

    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const browser = req.headers['user-agent'];
    
    console.log(browser.includes('Chrome')); // saytga browserdan(chrome dan ) kirishini tekshiradi

    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(+id);
  }
}
