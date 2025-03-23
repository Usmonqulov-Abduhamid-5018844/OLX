import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { CreateUserProductDto } from './dto/create-user_product.dto';
import { UpdateUserProductDto } from './dto/update-user_product.dto';
import { AuthGuard } from 'src/Guard/auth.guard';
import { Request } from 'express';

@Controller('user-product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserProductDto: CreateUserProductDto, @Req() req: Request) {
    return this.userProductService.create(createUserProductDto, req);
  }

  @Get()
  findAll() {
    return this.userProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProductService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProductService.remove(id);
  }
}
