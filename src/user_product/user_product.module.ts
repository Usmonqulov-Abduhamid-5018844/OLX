import { Module } from '@nestjs/common';
import { UserProductService } from './user_product.service';
import { UserProductController } from './user_product.controller';
import { PrismaService } from 'src/prizma/prizma.service';

@Module({
  controllers: [UserProductController],
  providers: [UserProductService, PrismaService],
})
export class UserProductModule {}
