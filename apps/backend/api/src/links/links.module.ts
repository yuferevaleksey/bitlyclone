import { Module } from '@nestjs/common';
import { LinksService } from './services/links.service';
import { LinksController } from './links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './entities/link.entity';
import { UserLinksEntity } from './entities/user-links.entity';
import { UserLinksService } from './services/user-links.service';
import { UserLinksViewsEntity } from './entities/user-links-views.entity';
import { UserLinksViewsService } from './services/user-links-views.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LinkEntity,
      UserLinksEntity,
      UserLinksViewsEntity,
    ]),
  ],
  controllers: [LinksController],
  providers: [LinksService, UserLinksService, UserLinksViewsService],
})
export class LinksModule {}
