import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Type {
  Accessories = 'Accessories',
  Laptops = 'Laptops',
  Phone = 'Phone',
  Electronics = 'Electronics',
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'T-shirt', description: 'category nomi (uzbekcha)' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Футболка', description: 'category nomi (ruscha)' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'T-shirt', description: 'category nomi (inglizcha)' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'image' })
  @IsString()
  image?: string;

  @ApiProperty({ example: 'Accessories | Laptops | Phone | Electronics ' })
  @IsEnum(Type)
  type: Type;
}
