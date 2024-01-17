import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Data } from "./data.db";



@Injectable()
export class DataDao {

    constructor(
        @InjectModel(Data.name, "local")
        private dataModel: Model<Data>,
    ) {

    }
    
    async getAll() {
        return this.dataModel.find().sort('-created');
    }
    
    async get(id: string) {
        return this.dataModel.findById(id);
    }

    async create(data: Data) {
        return await this.dataModel.create(data);
    }

    async update(id: string, data: Data) {
        return await this.dataModel.findOneAndUpdate({ _id: id }, data, {returnDocument: 'after'});
    }

    async delete(id: string) {
        return await this.dataModel.deleteOne({_id: id})
    }
}