import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Data } from "./data.db";

@Controller("data")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.getAllToDos();
  }

  @Get(':id')
  getToDo(@Param('id') id: string) {
    return this.appService.getToDo(id);
  }

  @Post()
  postToDo(@Body() data: Data) {
    return this.appService.createToDo(data);
  }

  @Put(':id')
  putToDo(@Param('id') id: string, @Body() data: Data) {
    return this.appService.updateToDo(id, data);
  }

  @Delete(':id')
  deleteToDo(@Param('id') id: string) {
    return this.appService.deleteToDo(id);
  }
}
