import { Module } from '@nestjs/common';
import { PrismaService } from './prizma.service';


@Module({
  providers: [PrismaService],
  exports:[PrismaService],
})
export class PrizmaModule {}
