import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { AddFilmDto } from './dto';
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
}
