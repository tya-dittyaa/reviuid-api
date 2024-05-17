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

  @Get('search/:username')
  @UseGuards(HeaderApiKeyGuard)
  async searchUser(@Param('username') username: string) {
    return this.usersService.searchUser(username);
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

  @Get('display/favorite/:username')
  @UseGuards(HeaderApiKeyGuard)
  async getFavoriteFilms(@Param('username') username: string) {
    return this.usersService.getFavoriteFilms(username);
  }

  @Get('display/watchlist/:username')
  @UseGuards(HeaderApiKeyGuard)
  async getWatchlistFilms(@Param('username') username: string) {
    return this.usersService.getWatchlistFilms(username);
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

  @Post('review/:filmId')
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard)
  async addFilmReview(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
    @Body() dto: AddFilmReviewDto,
  ) {
    return this.usersService.addFilmReview(userId, filmId, dto);
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
