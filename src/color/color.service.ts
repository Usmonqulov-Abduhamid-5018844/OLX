import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prizma/prizma.service';

@Injectable()
export class ColorService {
   
    constructor(private prisma: PrismaService) {}
    async create(data: CreateColorDto) {
      return await this.prisma.color.create({ data });
    }
  
    async findAll() {
      let data = await this.prisma.color.findMany();
      if (!data.length) {
        throw new NotFoundException('Not fount');
      }
      return data;
    }
  
    async findOne(id: string) {
      let data = await this.prisma.color.findUnique({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount');
      }
      return data;
    }
  
    async update(id: string, d: UpdateColorDto) {
      let data = await this.prisma.color.findUnique({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount');
      }
      return {
        data: await this.prisma.color.update({ where: { id }, data: d }),
      };
    }
  
    async remove(id: string) {
      let data = await this.prisma.color.findUnique({ where: { id } });
      if (!data) {
        throw new NotFoundException('Not fount');
      }
      return await this.prisma.color.delete({ where: { id } });
    }
  }