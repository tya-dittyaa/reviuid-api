import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles, User } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { AddFilmDto, UpdateFilmDto } from './dto';
import { FilmsService } from './films.service';

@ApiTags('Films Endpoints')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post('add')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async addFilm(@Body() dto: AddFilmDto) {
    return this.filmsService.addFilm(dto);
  }

  @Get(':id')
  async getFilm(@Param('id') id: string) {
    return this.filmsService.getFilm(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async updateFilm(@Param('id') id: string, @Body() dto: UpdateFilmDto) {
    return this.filmsService.updateFilm(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async deleteFilm(@Param('id') id: string) {
    return this.filmsService.deleteFilm(id);
  }

  @Get('broadcast-today')
  async getBroadcastToday() {
    return this.filmsService.getBroadcastToday();
  }

  @Get('top-10')
  async getTop10() {
    return this.filmsService.getTop10();
  }

  @Get('top-favorite')
  async getTopFavorite() {
    return this.filmsService.getTopFavorite();
  }

  @Get('coming-soon')
  async getComingSoon() {
    return this.filmsService.getComingSoon();
  }

  @Put('users/favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.filmsService.addFavoriteFilm(userId, filmId);
  }

  @Delete('users/favorites/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeFavoriteFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.filmsService.removeFavoriteFilm(userId, filmId);
  }

  @Put('users/watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async addFilmToWatchlist(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.filmsService.addWatchlistFilm(userId, filmId);
  }

  @Delete('users/watchlist/:filmId')
  @UseGuards(AccessTokenGuard)
  async removeWatchlistFilm(
    @User('sub') userId: string,
    @Param('filmId') filmId: string,
  ) {
    return this.filmsService.removeWatchlistFilm(userId, filmId);
  }
}
