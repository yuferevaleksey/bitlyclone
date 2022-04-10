import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {

	@ApiProperty({
        description: 'User email',
        type: String,
        required: true,
    })
	@IsNotEmpty()
    @IsEmail()
	email: string;

    @ApiProperty({
        description: 'User password',
        type: String,
        required: true,
    })
	@IsNotEmpty()
	password: string;
}