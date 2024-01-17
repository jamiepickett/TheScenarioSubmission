import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataDao } from './data.dao';
import { Data } from './data.db';

@Injectable()
export class AppService {

  constructor(
    private readonly dataDao: DataDao
  ){}

  async getAllToDos() {
    return await this.dataDao.getAll()
  }

  async getToDo(id: string) {
    // return [{data: 'get by '+ id }]
    return await this.dataDao.get(id);
  }

  async createToDo(data: Data) {
    return await this.dataDao.create(data);
    //return await this.dataDao.getAll()
  }

  async updateToDo(id: string, data: Data) {
    return await this.dataDao.update(id, data);
    // return [{data: 'update id '+ id + ' with data: ' + data }]
    
  }

  async deleteToDo(id: string) {
    return await this.dataDao.delete(id);
    // return [{data: 'delete by '+ id }]
  }
}
