import { Dto } from '../../dto/dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetLongLinkResponse extends Dto<GetLongLinkResponse> {
  @ApiProperty({
    description: 'Long link URL',
    type: String,
  })
  longLink: string;

  @ApiProperty({
    description: 'User link id',
    type: Number,
  })
  linkId: number;
}
