import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrizmaModule } from './prizma/prizma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt'
import { RegionModule } from './region/region.module';

@Module({
  imports: [ConfigModule.forRoot(), PrizmaModule, AuthModule, MailModule,
    JwtModule.register({
      global: true,
    }),
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService,
  ],
})
export class AppModule {}
