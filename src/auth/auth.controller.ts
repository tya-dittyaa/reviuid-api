import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/common/guards';
import { JwtPayloadData } from '../common/types';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }

  @Get('signout')
  @UseGuards(AccessTokenGuard)
  async signout(@User('sub') userId: string) {
    return this.authService.signOut(userId);
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@User() user: JwtPayloadData) {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
