import { Module } from '@nestjs/common';
import { LinksModule } from '../links/links.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LinkEntity } from '../links/entities/link.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { UserLinksEntity } from '../links/entities/user-links.entity';
import { UserLinksViewsEntity } from '../links/entities/user-links-views.entity';

@Module({
  imports: [
    LinksModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './bitly-clone.sqlite',
      entities: [LinkEntity, User, UserLinksEntity, UserLinksViewsEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
