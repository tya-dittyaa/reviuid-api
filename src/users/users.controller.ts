import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@GetCurrentUserId() userId: string) {
    return this.usersService.findOne(userId);
  }
}
