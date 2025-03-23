import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prizma/prizma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
  }

  async findAll() {
    let data = await this.prisma.category.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async update(id: string, d: UpdateCategoryDto) {
    let data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return {
      data: await this.prisma.category.update({ where: { id }, data: d }),
    };
  }

  async remove(id: string) {
    let data = await this.prisma.category.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.category.delete({ where: { id } });
  }
}
