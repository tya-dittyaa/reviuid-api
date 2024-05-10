import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { SettingsDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get(':username')
  @HttpCode(HttpStatus.OK)
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.getUserByUsername(username);
  }

  @Post('settings')
  @HttpCode(HttpStatus.OK)
  async updateUserSettings(
    @GetCurrentUserId() userId: string,
    @Body() dto: SettingsDto,
  ) {
    return this.usersService.updateUserSettings(userId, dto);
  }
}
