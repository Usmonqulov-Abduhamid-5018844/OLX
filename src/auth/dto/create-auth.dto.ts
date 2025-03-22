import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Usmonqulov Abduhamid' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Region ID' })
  @IsString()
  @IsNotEmpty()
  regionId: string;

  @ApiProperty({ example: 'Link' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'Tashkent, Uzbekistan' })
  @IsString()
  @IsOptional()
  location?: string;
}

export class Role {
  ADMIN = 'ADMIN';
  USER = 'USER';
  SUPPER_ADMIN = 'SUPPER_ADMIN';
}
