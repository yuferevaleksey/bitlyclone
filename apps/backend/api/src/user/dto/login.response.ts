import { ApiProperty } from '@nestjs/swagger';
import { Dto } from '../../dto/dto';

export class LoginResponse extends Dto<LoginResponse> {
  @ApiProperty({
    description: 'Access token',
    type: String,
  })
  accessToken: string;
}
