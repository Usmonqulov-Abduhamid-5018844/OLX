import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrizmaModule } from 'src/prizma/prizma.module';
import { MailModule } from 'src/mail/mail.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[PrizmaModule, MailModule]
})
export class AuthModule {}
