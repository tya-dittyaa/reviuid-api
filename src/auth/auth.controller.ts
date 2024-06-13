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
import { SigninDto, SignupDto, VerifyOtpDto } from './dto';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/signup')
  @UseGuards(HeaderApiKeyGuard)
  async signup(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('user/signin')
  @UseGuards(HeaderApiKeyGuard)
  async signin(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }

  @Get('user/signout')
  @UseGuards(AccessTokenGuard)
  async signout(@User('sub') userId: string) {
    return this.authService.signOut(userId);
  }

  @Get('user/refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@User() user: JwtPayloadData) {
    return this.authService.refreshUserTokens(user.sub, user.refreshToken);
  }

  @Post('user/otp/send')
  @UseGuards(HeaderApiKeyGuard)
  async sendOtp(@Body() dto: { email: string }) {
    return this.authService.sendOtp(dto.email);
  }

  @Post('user/otp/verify')
  @UseGuards(HeaderApiKeyGuard)
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
