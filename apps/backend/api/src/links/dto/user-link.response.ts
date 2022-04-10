import { Dto } from '../../dto/dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserLinkData extends Dto<UserLinkData> {
  @ApiProperty({
    description: 'User short link code.',
    type: String,
  })
  linkCode: string;

  @ApiProperty({
    description: 'Active flag.',
    type: Boolean,
  })
  active: boolean;

  @ApiProperty({
    description: 'Date of creation',
    type: Date,
  })
  createdAt: Date;
}

export class UserLinkResponse extends Dto<UserLinkResponse> {
  @ApiProperty({
    description: 'User short link entities.',
    type: [UserLinkData],
  })
  userLinks: UserLinkData[];
}
