import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prizma/prizma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { Request } from 'express';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateLikeDto, req: Request) {
    let userId = req['user'].id;

    return await this.prisma.like.create({ data:{...data, userId} });
  }

  async findAll() {
    let data = await this.prisma.like.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.like.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async remove(id: string) {
    let data = await this.prisma.like.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.like.delete({ where: { id } });
  }
}
