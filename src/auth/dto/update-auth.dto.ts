import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, isNotEmpty, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthDto {
  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '12.34.55' })
  @IsNotEmpty()
  api: string;
}

export class verify {
  @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: '12354' })
  @IsNotEmpty()
  otp: string;
}

export class sentOtp {
    @ApiProperty({ example: 'usmonqulovabduhamid00@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
