import {
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prizma/prizma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.prisma.region.findFirst({
        where: { name: createRegionDto.name },
      });
      if (region) {
        throw new ConflictException('Olredy exists');
      }
      return { data: await this.prisma.region.create({ data: createRegionDto }) };
    } catch (error) {
      throw new NotAcceptableException(error);
    }
  }
  async findAll() {
    let data = await this.prisma.region.findMany();
    if (!data.length) {
      return { Meesage: 'Not fount' };
    }
    return data;
  }

  async findOne(id: string) {
    let data = await this.prisma.region.findUnique({ where: { id } });
    if (!data) {
      return { Message: 'Not found' };
    }
    return data;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    let data = await this.prisma.region.findUnique({ where: { id } });
    if (!data) {
      return { Message: 'Not found' };
    }
    let newrdata = await this.prisma.region.update({
      where: { id },
      data: updateRegionDto,
    });
    return { newrdata };
  }

  async remove(id: string) {
    let data = await this.prisma.region.findUnique({ where: { id } });
    if (!data) {
      return { Message: 'Not found' };
    }
    return {delet: await this.prisma.region.delete({where:{id}})
    }
  }
}
