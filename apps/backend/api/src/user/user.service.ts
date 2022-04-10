import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './dto/login.response';
import { RegisterUserRequest } from './dto/register-user.requset';
import { JwtPayload } from './strategy/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  /**
   * Method for user validation.
   *
   * @param email: string;
   * @param password: string;
   */
  public async validateUser(
    email: string,
    password: string
  ): Promise<Partial<User>> {
    const user = await this.getUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  /**
   * Login user.
   *
   * @param user: User
   */
  public async login(user: User): Promise<LoginResponse> {
    const payload: JwtPayload = { email: user.email, userId: user.id };
    return new LoginResponse({
      accessToken: this.jwtService.sign(payload),
    });
  }

  /**
   * Register user.
   *
   * @param createUserRequest: RegisterUserRequest
   */
  public async registerUser(
    createUserRequest: RegisterUserRequest
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const { password } = createUserRequest;
    const hashedPass = await bcrypt.hash(password, salt);

    return this.userRepository.save(
      new User({
        ...createUserRequest,
        password: hashedPass,
      })
    );
  }

  /**
   * Get user by email from database.
   *
   * @param email: string
   */
  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
