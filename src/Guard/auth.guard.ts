import {CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private Jwt: JwtService){}
  canActivate(context: ExecutionContext): boolean {
    let request:Request = context.switchToHttp().getRequest();
    let Token = request.headers.authorization?.split(" ")[1]

    if(!Token){
      throw new UnauthorizedException("Token Not Found")
    }
    try{
      let data = this.Jwt.verify(Token, {secret: process.env.accseskey})
      request["user"] = data
      return true
    }
    catch(error){
      throw new UnauthorizedException("Wrong token")
    }
  }
}
