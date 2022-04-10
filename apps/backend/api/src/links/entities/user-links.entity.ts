import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dto } from '../../dto/dto';
import { LinkEntity } from './link.entity';

@Entity()
@Index(['linkCode', 'userId'])
export class UserLinksEntity extends Dto<UserLinksEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  linkCode: string;

  @Column()
  userId: number;

  @Column()
  linkId: number;

  @ManyToOne(() => LinkEntity, (link) => link.userLinks, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'linkId' })
  link: LinkEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default: true,
  })
  active: boolean;
}
