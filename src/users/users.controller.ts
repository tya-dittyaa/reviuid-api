import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators';
import { AccessTokenGuard, HeaderApiKeyGuard } from 'src/common/guards';
import { AddFilmReviewDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users Endpoints')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('display/:username/profile')
  @UseGuards(HeaderApiKeyGuard)
  async getProfile(@Param('username') username: string) {
    return this.usersService.getProfile(username);
  }

  @Get('display/:username/favorite/total')
  @UseGuards(HeaderApiKeyGuard)
  async getFavoriteTotals(@Param('username') username: string) {
    return this.usersService.getFavoriteTotals(username);
  }

  @Get('display/:username/watchlist/total')
  @UseGuards(HeaderApiKeyGuard)
  async getWatchlistTotals(@Param('username') username: string) {
    return this.usersService.getWatchlistTotals(username);
  }

  @Get('display/:username/favorite/page/:page')
  @UseGuards(HeaderApiKeyGuard)
  async getFavoriteFilms(
    @Param('username') username: string,
    @Param('page') page: number,
  ) {
    return this.usersService.getFavoriteFilms(username, page);
  }

  @Get('display/:username/watchlist/page/:page')
  @UseGuards(HeaderApiKeyGuard)
  async getWatchlistFilms(
    @Param('username') username: string,
    @Param('page') page: number,
  ) {
    return this.usersService.getWatchlistFilms(username, page);
  }

  @Post('check/username')
  @UseGuards(HeaderApiKeyGuard)
  async checkUsername(@Body('username') username: string) {
    return this.usersService.checkUsername(username);
  }

  @Post('check/email')
  @UseGuards(HeaderApiKeyGuard)
  async checkEmail(@Body('email') email: string) {
    return this.usersService.checkEmail(email);
  }

  @Patch('update/profile')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async updateProfile(@User('sub') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @Patch('update/avatar')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(
    @User('sub') userId: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.usersService.updateAvatar(userId, avatar);
  }

  @Delete('delete/profile')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async deleteProfile(@User('sub') userId: string) {
    return this.usersService.deleteProfile(userId);
  }

  @Delete('delete/avatar')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async deleteAvatar(@User('sub') userId: string) {
    return this.usersService.deleteAvatar(userId);
  }

  @Get('favorite/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async checkFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.checkFavoriteFilm(userId, filmId);
  }

  @Post('favorite/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async addFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addFavoriteFilm(userId, filmId);
  }

  @Delete('favorite/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async removeFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeFavoriteFilm(userId, filmId);
  }

  @Get('watchlist/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async checkWatchlistFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.checkWatchlistFilm(userId, filmId);
  }

  @Post('watchlist/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async addFilmToWatchlist(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.addWatchlistFilm(userId, filmId);
  }

  @Delete('watchlist/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async removeWatchlistFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeWatchlistFilm(userId, filmId);
  }

  @Get('review/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async getFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.getFilmReview(userId, filmId);
  }

  @Post('review/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async addFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
    @Body() dto: AddFilmReviewDto,
  ) {
    return this.usersService.addFilmReview(userId, filmId, dto);
  }

  @Patch('review/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async updateFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
    @Body() dto: AddFilmReviewDto,
  ) {
    return this.usersService.updateFilmReview(userId, filmId, dto);
  }

  @Delete('review/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async removeFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.usersService.removeFilmReview(userId, filmId);
  }
}
