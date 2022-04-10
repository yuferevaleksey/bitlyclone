import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class ExistUserGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.userService.getUserByEmail(request.body.email);
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User with the same email exist, please login',
        },
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }
}
