import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFilmDto } from './dto';

@Injectable()
export class FilmsService {
  constructor(private readonly prisma: PrismaService) {}

  async addFilm(dto: AddFilmDto) {
    dto.releaseDate = new Date(dto.releaseDate);
    dto.finishDate = dto.finishDate
      ? new Date(dto.finishDate)
      : new Date(dto.releaseDate);
    dto.finishDate.setMonth(dto.finishDate.getMonth() + 3);

    await this.prisma.films.create({
      data: {
        ...dto,
      },
    });
  }
}
