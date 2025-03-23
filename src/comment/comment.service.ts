import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prizma/prizma.service';
import { Request } from 'express';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDto, req: Request) {
    let userId = req['user'].id;
    return await this.prisma.comment.create({ data: { ...data, userId } });
  }

  async findAll() {
    let data = await this.prisma.comment.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.comment.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async remove(id: string) {
    let data = await this.prisma.comment.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.comment.delete({ where: { id } });
  }
}
