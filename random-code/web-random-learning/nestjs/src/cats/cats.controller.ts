import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Cat> {
    return this.catsService.findOne(id);
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<Cat> {
    return this.catsService.delete(id);
  }

  @Put(':id')
  async update(
    @Body() updateCatDto: CreateCatDto,
    @Param('id') id,
  ): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }
}
