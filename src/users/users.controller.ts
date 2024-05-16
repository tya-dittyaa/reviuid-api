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
import { AddFilmReviewDto, UpdateUserDto } from './dto';
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

  @Put('favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addFavoriteFilm(userId, filmId);
  }

  @Delete('favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeFavoriteFilm(userId, filmId);
  }

  @Put('watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFilmToWatchlist(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addWatchlistFilm(userId, filmId);
  }

  @Delete('watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeWatchlistFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeWatchlistFilm(userId, filmId);
  }

  @Put('reviews/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
    @Body() dto: AddFilmReviewDto,
  ) {
    return this.usersService.addFilmReview(userId, filmId, dto);
  }

  @Delete('reviews/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeFilmReview(userId, filmId);
  }
}
