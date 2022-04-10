import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLinksEntity } from '../entities/user-links.entity';
import { Repository } from 'typeorm';
import { LinkEntity } from '../entities/link.entity';
import { UserLinksViewsEntity } from '../entities/user-links-views.entity';
import {
  LinkViewsByDay,
  LinkViewsByDayResponse,
} from '../dto/link-views-by-day.response';
import { GetLongLinkResponse } from '../dto/get-long-link.response';
import { UserLinkData, UserLinkResponse } from '../dto/user-link.response';

@Injectable()
export class UserLinksService {
  constructor(
    @InjectRepository(UserLinksEntity)
    private userLinkRepository: Repository<UserLinksEntity>,
    @InjectRepository(UserLinksViewsEntity)
    private userLinksViewsEntityRepository: Repository<UserLinksViewsEntity>
  ) {}

  /**
   * Save user link.
   *
   * @param userId
   * @param linkId
   * @param linkCode
   */
  async saveUserLink(
    userId: number,
    linkId: number,
    linkCode: string
  ): Promise<UserLinksEntity | null> {
    if (!(userId && linkId && linkCode)) {
      throw new BadRequestException('linkCode is required params!');
    }

    return this.userLinkRepository.save(
      new UserLinksEntity({
        userId,
        linkId,
        linkCode,
      })
    );
  }

  /**
   * Return user link data by link code.
   *
   * @param linkCode
   */
  public async getLinkByCodeResponse(linkCode): Promise<GetLongLinkResponse> {
    if (!linkCode) {
      throw new BadRequestException('linkCode is required params!');
    }

    const linkData = await this.getLongLinkByCode(linkCode);

    if (!linkData) {
      return new GetLongLinkResponse({});
    }

    const { link, id: linkId } = linkData;
    return new GetLongLinkResponse({
      longLink: link.originLink,
      linkId,
    });
  }

  /**
   * Return link statistic.
   *
   * @param linkCode
   */
  public async getLinkViewsByCodeResponse(
    linkCode: string
  ): Promise<LinkViewsByDayResponse | null> {
    if (!linkCode) {
      throw new BadRequestException('linkCode is required params!');
    }

    const linkStatistic = await this.getLinkStatistic(linkCode);

    if (!linkStatistic) {
      return new LinkViewsByDayResponse({});
    }

    return new LinkViewsByDayResponse({
      linkStatistic,
    });
  }

  /**
   * Get user short links request.
   *
   * @param userId
   */
  public async getUserLinksRequest(userId: number): Promise<UserLinkResponse> {
    if (!userId) {
      throw new BadRequestException('userId is required params!');
    }

    const userLinks = await this.getUserLinks(userId);
    return new UserLinkResponse({
      userLinks,
    });
  }

  /**
   * Load from database user short links.
   *
   * @param userId
   */
  private async getUserLinks(userId: number): Promise<UserLinkData[]> {
    return this.userLinkRepository
      .createQueryBuilder('user_links')
      .where('user_links.userId = :userId', { userId })
      .getMany();
  }

  /**
   * Load from database link statistic.
   *
   * @param linkCode
   * @private
   */
  private async getLinkStatistic(linkCode: string): Promise<LinkViewsByDay[]> {
    const test = this.userLinkRepository
      .createQueryBuilder('user_links')
      .select('user_links.linkCode', 'linkCode')
      .leftJoinAndSelect(
        (query) =>
          query
            .select("strftime('%Y-%m-%d', views.createdAt)", 'viewDate')
            .addSelect('views.userLinkId', 'linkId')
            .addSelect('count(views.id)', 'count')
            .from(UserLinksViewsEntity, 'views')
            .groupBy('viewDate')
            .addGroupBy('linkId'),
        'views',
        'views.linkId = user_links.id'
      )
      .where('user_links.linkCode = :code', { code: linkCode });

    console.log('test.getQuery()', test.getQuery());

    return test.getRawMany<LinkViewsByDay>();
  }

  /**
   * Select long link data by code.
   *
   * @param linkCode
   * @private
   */
  private getLongLinkByCode(linkCode: string): Promise<UserLinksEntity> {
    return this.userLinkRepository
      .createQueryBuilder('user_links')
      .leftJoinAndMapOne(
        'user_links.link',
        LinkEntity,
        'link',
        'user_links.linkId = link.id'
      )
      .where('user_links.linkCode = :code', { code: linkCode })
      .getOne();
  }
}
