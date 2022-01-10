import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { TGuarded } from './interface/guarded-payload.interface';
import { AuthDto } from './dto/auth.dto';
import { omit } from 'lodash';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req: TGuarded<Record<string, never>>) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() authDto: AuthDto) {
    return omit(await this.authService.register(authDto), 'passwordHash');
  }
}
