import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: string) {
    return this.prisma.films.findUnique({
      where: {
        id,
      },
    });
  }

  async getFilm(id: string) {
    // Check if the film exists
    const film = await this.findById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    delete film.createdAt;
    delete film.updatedAt;
    delete film.totalFavorites;
    delete film.releaseDate;
    delete film.finishDate;

    return film;
  }

  async deleteFilm(id: string) {
    // Check if the film exists
    const film = await this.findById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    await this.prisma.films.delete({
      where: {
        id,
      },
    });
  }

  async getBroadcastToday() {
    const today = new Date();
    const list = await this.prisma.films.findMany({
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

    if (list.length === 0) {
      throw new NotFoundException('No films are broadcasting today');
    }

    return list;
  }

  async getTop10() {
    const list = await this.prisma.films.findMany({
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

    if (list.length === 0) {
      throw new NotFoundException('No films are available yet');
    }

    return list;
  }

  async getTopFavorite() {
    const list = await this.prisma.films.findMany({
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

    if (list.length === 0) {
      throw new NotFoundException('No films are available yet');
    }

    return list;
  }

  async getComingSoon() {
    const today = new Date();
    const list = await this.prisma.films.findMany({
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

    if (list.length === 0) {
      throw new NotFoundException('No films are coming soon');
    }

    return list;
  }
}
