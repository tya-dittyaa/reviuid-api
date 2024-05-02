import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto.email, loginUserDto.password);
  }
}
