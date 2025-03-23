import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProductDto } from './dto/create-user_product.dto';
import { UpdateUserProductDto } from './dto/update-user_product.dto';
import { PrismaService } from 'src/prizma/prizma.service';
import { Request } from 'express';

@Injectable()
export class UserProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserProductDto, req: Request) {
    let userId = req["user"].id
    return await this.prisma.userProduct.create({ data : {...data, userId}});
  }

  async findAll() {
    let data = await this.prisma.userProduct.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.userProduct.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async remove(id: string) {
    let data = await this.prisma.userProduct.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.userProduct.delete({ where: { id } });
  }
}
