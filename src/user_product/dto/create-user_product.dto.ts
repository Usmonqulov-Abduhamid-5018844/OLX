import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserProductDto {
  @ApiProperty({ example: 'productId' })
  @IsNotEmpty()
  productId: string;
}
