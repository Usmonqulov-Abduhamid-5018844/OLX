import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prizma/prizma.service';
import { Request } from 'express';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto, req: Request) {
    let userId = req['user'].id;
    return await this.prisma.order.create({ data: { ...data, userId } });
  }

  async findAll() {
    let data = await this.prisma.order.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.order.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async remove(id: string) {
    let data = await this.prisma.order.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.order.delete({ where: { id } });
  }
}
