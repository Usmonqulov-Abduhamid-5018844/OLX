import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: 'userId' })
  @IsNotEmpty()
  fromId: string;

  @ApiProperty({ example: 'userId' })
  @IsNotEmpty()
  toId: string;

  @ApiProperty({ example: 'msg' })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'productId' })
  @IsNotEmpty()
  productId: string;
}
