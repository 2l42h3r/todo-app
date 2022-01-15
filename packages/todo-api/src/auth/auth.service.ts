import { Injectable } from '@nestjs/common';
import { UserService } from '../models/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { omit } from 'lodash';
import { TAuthPayload } from './interface/auth-payload.interface';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<null | TAuthPayload> {
    const user = await this.userService.user({ name: username });
    if (!user) {
      return null;
    }
    const isMatch = await compare(password, user.passwordHash);
    if (!isMatch) {
      return null;
    }
    return omit(user, 'passwordHash');
  }

  login(user: TAuthPayload) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(payload: AuthDto) {
    const hashedPassword = await hash(payload.password, 10);
    return this.userService.createUser({
      name: payload.username,
      passwordHash: hashedPassword,
    });
  }
}
