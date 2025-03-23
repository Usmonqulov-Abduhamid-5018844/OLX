import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum ProductStatus {
    PENDING = 'PENDING',
    FELED = 'FELED',
    ACTIV = 'ACTIV',
  }
  
export class CreateProductDto {
  @ApiProperty({ example: 'T-shirt', description: 'Mahsulot nomi (uzbekcha)' })
  @IsString()
  @IsNotEmpty()
  name_uz: string;

  @ApiProperty({ example: 'Футболка', description: 'Mahsulot nomi (ruscha)' })
  @IsString()
  @IsNotEmpty()
  name_ru: string;

  @ApiProperty({ example: 'T-shirt', description: 'Mahsulot nomi (inglizcha)' })
  @IsString()
  @IsNotEmpty()
  name_en: string;

  @ApiProperty({ example: 'https://image.url', description: 'Mahsulot rasmi' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 150000, description: 'Mahsulot narxi' })
  @IsInt()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: "categoryId", description: 'Kategoriya ID' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    example: 'Yumshoq matodan tikilgan',
    description: "Mahsulot ta'rifi (uzbekcha)",
  })
  @IsString()
  @IsOptional()
  description_uz: string;

  @ApiProperty({
    example: 'Сделано из мягкой ткани',
    description: "Mahsulot ta'rifi (ruscha)",
  })
  @IsString()
  @IsOptional()
  description_ru: string;

  @ApiProperty({
    example: 'Made of soft fabric',
    description: "Mahsulot ta'rifi (inglizcha)",
  })
  @IsString()
  @IsOptional()
  description_en: string;

  @ApiProperty({
    example: true,
    description: 'Mahsulot yangi yoki eski (true - yangi, false - eski)',
  })
  @IsBoolean()
  @IsNotEmpty()
  isNew: boolean;

  @ApiProperty({ example: 10, description: 'Chegirma foizi (skidka)' })
  @IsInt()
  @IsOptional()
  skitka?: number;

  @ApiProperty({ example: "colorId", description: 'Rang ID' })
  @IsString()
  colorId: string;
}
