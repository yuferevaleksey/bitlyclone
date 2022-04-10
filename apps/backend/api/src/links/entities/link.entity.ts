import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dto } from '../../dto/dto';
import { UserLinksEntity } from './user-links.entity';

@Entity()
@Index(['originLink'], { unique: true })
export class LinkEntity extends Dto<LinkEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originLink: string;

  @OneToMany(() => UserLinksEntity, (post) => post.link)
  userLinks: UserLinksEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
