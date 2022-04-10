import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Dto } from '../../dto/dto';

@Entity()
export class UserLinksViewsEntity extends Dto<UserLinksViewsEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userLinkId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
