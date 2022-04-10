import { Dto } from '../../dto/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterUserRequest extends Dto<RegisterUserRequest> {
  @ApiProperty({
    description: 'User email.',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password.',
    type: String,
  })
  password: string;
}
