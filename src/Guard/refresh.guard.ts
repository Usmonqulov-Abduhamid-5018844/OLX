import {CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private Jwt: JwtService){}
  canActivate(context: ExecutionContext): boolean {
    let request:Request = context.switchToHttp().getRequest();
    console.log(request.headers.authorization);
    
    let Token = request.headers.authorization?.split(" ")[1]

    console.log(Token);
    
    if(!Token){
      throw new UnauthorizedException("Token Not Found")
    }
    try{
      let data = this.Jwt.verify(Token,{secret: process.env.refreshkey})
      request["user"] = data
      return true
    }
    catch(error){
      throw new UnauthorizedException("Wrong token")
    }
  }
}
