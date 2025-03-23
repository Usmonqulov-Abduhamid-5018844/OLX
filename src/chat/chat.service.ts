import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prizma/prizma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateChatDto) {
    return await this.prisma.chat.create({ data });
  }

  async findAll() {
    let data = await this.prisma.chat.findMany();
    if (!data.length) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.chat.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return data;
  }

  async update(id: string, d: UpdateChatDto) {
    let data = await this.prisma.chat.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return {
      data: await this.prisma.chat.update({ where: { id }, data: d }),
    };
  }

  async remove(id: string) {
    let data = await this.prisma.chat.findUnique({ where: { id } });
    if (!data) {
      throw new NotFoundException('Not fount');
    }
    return await this.prisma.chat.delete({ where: { id } });
  }
}
