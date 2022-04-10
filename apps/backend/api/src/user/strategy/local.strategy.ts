import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * Validate user.
   *
   * @param email: string
   * @param password: string
   */
  public async validate(
    email: string,
    password: string
  ): Promise<Partial<User>> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
