import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
