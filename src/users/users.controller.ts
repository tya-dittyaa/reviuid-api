import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { AccessTokenGuard } from 'src/common/guards';
import { AddFavoriteFilmDto, AddWatchlistFilmDto, UpdateUserDto } from './dto';
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

  @Delete(':username')
  @UseGuards(AccessTokenGuard)
  async deleteProfile(
    @User('sub') userId: string,
    @Param('username') username: string,
  ) {
    return this.usersService.deleteProfile(userId, username);
  }

  @Put('films/favorites')
  @UseGuards(AccessTokenGuard)
  async addFavoriteFilm(
    @User('sub') userId: string,
    @Body() dto: AddFavoriteFilmDto,
  ) {
    return this.usersService.addFavoriteFilm(userId, dto);
  }

  @Put('films/watchlist')
  @UseGuards(AccessTokenGuard)
  async addFilmToWatchlist(
    @User('sub') userId: string,
    @Body() dto: AddWatchlistFilmDto,
  ) {
    return this.usersService.addWatchlistFilm(userId, dto);
  }
}
