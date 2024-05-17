import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import {
  AccessTokenGuard,
  HeaderApiKeyGuard,
  RolesGuard,
} from 'src/common/guards';
import { AddFilmDto, UpdateFilmDto } from './dto';
import { FilmsService } from './films.service';

@ApiTags('Films Endpoints')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post('add')
  @Roles(Role.Admin)
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard, RolesGuard)
  async addFilm(@Body() dto: AddFilmDto) {
    return this.filmsService.addFilm(dto);
  }

  @Get(':id')
  @UseGuards(HeaderApiKeyGuard)
  async getFilm(@Param('id') id: string) {
    return this.filmsService.getFilm(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard, RolesGuard)
  async updateFilm(@Param('id') id: string, @Body() dto: UpdateFilmDto) {
    return this.filmsService.updateFilm(id, dto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(HeaderApiKeyGuard, AccessTokenGuard, RolesGuard)
  async deleteFilm(@Param('id') id: string) {
    return this.filmsService.deleteFilm(id);
  }

  @Get('display/broadcast-today')
  @UseGuards(HeaderApiKeyGuard)
  async getBroadcastToday() {
    return this.filmsService.getBroadcastToday();
  }

  @Get('display/top-10')
  @UseGuards(HeaderApiKeyGuard)
  async getTop10() {
    return this.filmsService.getTop10();
  }

  @Get('display/top-favorite')
  @UseGuards(HeaderApiKeyGuard)
  async getTopFavorite() {
    return this.filmsService.getTopFavorite();
  }

  @Get('display/coming-soon')
  @UseGuards(HeaderApiKeyGuard)
  async getComingSoon() {
    return this.filmsService.getComingSoon();
  }
}
