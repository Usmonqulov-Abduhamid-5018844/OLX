import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

  @ApiProperty({ example: 'productId' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  count: number;
}
