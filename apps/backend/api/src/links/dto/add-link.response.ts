import { Dto } from '../../dto/dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddLinkResponse extends Dto<AddLinkResponse> {
  @ApiProperty({
    description: 'Code short link',
    type: String,
  })
  linkCode!: string;
}
