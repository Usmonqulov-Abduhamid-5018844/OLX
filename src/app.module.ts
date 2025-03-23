import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { PrizmaModule } from './prizma/prizma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { JwtModule } from '@nestjs/jwt'
import { RegionModule } from './region/region.module';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { OrdersModule } from './orders/orders.module';
import { ChatModule } from './chat/chat.module';
import { UserProductModule } from './user_product/user_product.module';
import { CategoryModule } from './category/category.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [ConfigModule.forRoot(), PrizmaModule, AuthModule, MailModule,
    JwtModule.register({
      global: true,
    }),
    RegionModule,
    ProductModule,
    ColorModule,
    OrdersModule,
    ChatModule,
    UserProductModule,
    CategoryModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService,
  ],
})
export class AppModule {}
