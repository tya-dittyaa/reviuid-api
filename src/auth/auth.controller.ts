import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import {
  AccessTokenGuard,
  HeaderApiKeyGuard,
  RefreshTokenGuard,
} from 'src/common/guards';
import { JwtPayloadData } from '../common/types';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/signup')
  @UseGuards(HeaderApiKeyGuard)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('users/signin')
  @UseGuards(HeaderApiKeyGuard)
  async signin(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }

  @Get('users/signout')
  @UseGuards(AccessTokenGuard)
  async signout(@User('sub') userId: string) {
    return this.authService.signOut(userId);
  }

  @Get('users/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@User() user: JwtPayloadData) {
    return this.authService.refreshUserTokens(user.sub, user.refreshToken);
  }
}
