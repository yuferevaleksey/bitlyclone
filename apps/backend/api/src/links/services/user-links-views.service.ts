import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLinksViewsEntity } from '../entities/user-links-views.entity';

export class UserLinksViewsService {
  constructor(
    @InjectRepository(UserLinksViewsEntity)
    private userLinksViewsEntityRepository: Repository<UserLinksViewsEntity>
  ) {}

  /**
   * Save track of link view.
   * @param userLinkId
   */
  async saveLinkView(userLinkId: number): Promise<UserLinksViewsEntity | null> {
    if (!userLinkId) {
      return null;
    }
    return this.userLinksViewsEntityRepository.save(
      new UserLinksViewsEntity({
        userLinkId,
      })
    );
  }
}
