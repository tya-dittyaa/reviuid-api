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

  @Delete(':username')
  @UseGuards(AccessTokenGuard)
  async deleteProfile(
    @User('sub') userId: string,
    @Param('username') username: string,
  ) {
    return this.usersService.deleteProfile(userId, username);
  }

  @Put('films/favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addFavoriteFilm(userId, filmId);
  }

  @Put('films/watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFilmToWatchlist(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addWatchlistFilm(userId, filmId);
  }

  @Delete('films/favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeFavoriteFilm(userId, filmId);
  }

  @Delete('films/watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeWatchlistFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeWatchlistFilm(userId, filmId);
  }
}
