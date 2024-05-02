import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';

@ApiTags('User Endpoints')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
