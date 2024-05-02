import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/loginUser.dto';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { AuthGuard } from './guard/jwt.auth.guard';

@ApiTags('Authentication Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.createUser(registerUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: UserLoginDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @Get('test-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  test() {
    return this.authService.test();
  }
}
