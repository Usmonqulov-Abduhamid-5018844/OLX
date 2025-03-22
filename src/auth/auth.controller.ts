import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { sentOtp, UpdateAuthDto, verify } from './dto/update-auth.dto';
import { Request } from 'express';
import { RefreshGuard } from 'src/Guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() UpdateAuthDto: UpdateAuthDto) {
    return this.authService.login(UpdateAuthDto);
  }
  @Post('verify_otp')
  verify(@Body() data: verify) {
    return this.authService.verify(data);
  }
  @Post('sendOtp')
  sendOtp(@Body() data: sentOtp) {
    return this.authService.sendOtp(data);
  }
  
  @UseGuards(RefreshGuard)
  @Get('refreshToken')
  refreshToken(@Req() data: Request) {
    console.log(data);

    return this.authService.refreshTokent(data);
  }
}
