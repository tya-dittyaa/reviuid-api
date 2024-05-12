import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async displayProfile(@Param('username') username: string) {
    return this.usersService.displayProfile(username);
  }

  @Patch(':username')
  @UseGuards(AccessTokenGuard)
  async updateProfile(
    @User('sub') userId: string,
    @Param('username') username: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(userId, username, dto);
  }
}
