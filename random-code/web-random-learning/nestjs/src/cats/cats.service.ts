import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find();
  }

  async findOne(id: string): Promise<Cat> {
    return await this.catModel.findOne({ _id: id });
  }

  async create(cat: Cat): Promise<Cat> {
    const newCat = new this.catModel(cat);
    return await newCat.save();
  }
  async delete(id: string): Promise<Cat> {
    return await this.catModel.findByIdAndRemove(id);
  }
  async update(id: string, cat: Cat): Promise<Cat> {
    return await this.catModel.findByIdAndUpdate(id, cat, { new: true });
  }
}
