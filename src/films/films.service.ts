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

  async deleteFilm(id: string) {
    await this.prisma.films.delete({
      where: {
        id,
      },
    });
  }

  async getBroadcastToday() {
    const today = new Date();
    return this.prisma.films.findMany({
      where: {
        releaseDate: {
          lte: today,
        },
        finishDate: {
          gte: today,
        },
      },
      orderBy: {
        releaseDate: 'desc',
      },
      select: {
        id: true,
        title: true,
        poster: true,
      },
    });
  }

  async getTop10() {
    return this.prisma.films.findMany({
      take: 10,
      orderBy: {
        totalRating: 'desc',
      },
      select: {
        id: true,
        title: true,
        poster: true,
      },
    });
  }

  async getTopFavorite() {
    return this.prisma.films.findMany({
      take: 10,
      orderBy: {
        totalFavorites: 'desc',
      },
      select: {
        id: true,
        title: true,
        poster: true,
      },
    });
  }

  async getComingSoon() {
    const today = new Date();
    return this.prisma.films.findMany({
      where: {
        releaseDate: {
          gt: today,
        },
      },
      orderBy: {
        releaseDate: 'asc',
      },
      select: {
        id: true,
        title: true,
        poster: true,
      },
    });
  }
}
