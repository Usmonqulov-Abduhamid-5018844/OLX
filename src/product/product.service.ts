import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prizma/prizma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto) {
    return await this.prisma.product.create({ data });
  }

  async findAll() {
    let data = await this.prisma.product.findMany({
      include: {
        _count: { select: { likes: true } },
        userProducts: {
          select: { user: true },
        },
        category: true,

      },
    });
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.product.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async update(id: string, pr: UpdateProductDto) {
    let data = await this.prisma.product.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return {
      data: await this.prisma.product.update({ where: { id }, data: pr }),
    };
  }

  async remove(id: string) {
    let data = await this.prisma.product.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.product.delete({ where: { id } });
  }
}
