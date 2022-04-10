import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddLinkRequest } from '../dto/add-link.request';
import { AddLinkResponse } from '../dto/add-link.response';
import { LinkEntity } from '../entities/link.entity';
import { makeRandomString } from '../utils/utils';
import { UserLinksService } from './user-links.service';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    private userLinkService: UserLinksService
  ) {}

  /**
   * Save link and generate code for it.
   *
   * @param linkUrl
   * @param userId
   */
  async generateShortLink(
    { linkUrl }: AddLinkRequest,
    userId: number
  ): Promise<AddLinkResponse> {
    // todo: implement transaction here
    let linkData = await this.findByUrl(linkUrl);

    if (!linkData?.id) {
      const link = new LinkEntity({
        originLink: linkUrl,
      });

      linkData = await this.linkRepository.save(link);
    }

    const userLinkData = await this.userLinkService.saveUserLink(
      userId,
      linkData?.id,
      makeRandomString(6)
    );

    return new AddLinkResponse({
      linkCode: userLinkData.linkCode,
    });
  }

  /**
   * Find by link url.
   *
   * @param link
   */
  async findByUrl(link: string) {
    return this.linkRepository
      .createQueryBuilder('link')
      .where('link.originLink = :link', { link })
      .getOne();
  }
}
