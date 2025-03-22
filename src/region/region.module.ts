import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { PrizmaModule } from 'src/prizma/prizma.module';

@Module({
  controllers: [RegionController],
  providers: [RegionService],
  imports: [PrizmaModule],
})
export class RegionModule {}
