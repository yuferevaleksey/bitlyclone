import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Dto } from '../../dto/dto';

export class AddLinkRequest extends Dto<AddLinkRequest> {
  @ApiProperty({
    description: 'User password',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  linkUrl: string;
}
