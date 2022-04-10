import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginRequest } from './dto/login.request';
import { LoginResponse } from './dto/login.response';
import { ExistUserGuard } from './guards/exist-user.guard';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserRequest } from './dto/register-user.requset';
import { ApiResDto, PromiseResDto, ResDto } from '../dto/dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiResDto({
    type: LoginResponse,
    description: 'Method for register user.',
  })
  @UseGuards(ExistUserGuard)
  async registerUser(
    @Body() createUserDto: RegisterUserRequest
  ): PromiseResDto<LoginResponse> {
    const user = await this.userService.registerUser(createUserDto);
    const response = await this.userService.login(user);

    return new ResDto(response);
  }

  @Post('login')
  @ApiResDto({
    type: LoginResponse,
    description: 'Method for login user.',
  })
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() loginRequest: LoginRequest,
    @Request() req
  ): PromiseResDto<LoginResponse> {
    const response = await this.userService.login(req.user);
    return new ResDto(response);
  }
}
