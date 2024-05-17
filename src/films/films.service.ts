import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFilmDto, UpdateFilmDto } from './dto';

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

  async calculateTotalRating(filmId: string) {
    const totalRating = await this.prisma.userFilmReview.aggregate({
      where: {
        film_id: filmId,
      },
      _sum: {
        rating: true,
      },
    });

    const totalReviews = await this.prisma.userFilmReview.count({
      where: {
        film_id: filmId,
      },
    });

    const rating =
      totalReviews !== 0 && !isNaN(totalRating._sum.rating)
        ? totalRating._sum.rating / totalReviews
        : 0;

    await this.prisma.films.update({
      where: {
        id: filmId,
      },
      data: {
        rating: rating,
        totalRatings: totalReviews,
      },
    });
  }

  async calculateTotalFavorites(filmId: string) {
    const totalFavorites = await this.prisma.userFilmFavorite.count({
      where: {
        film_id: filmId,
      },
    });

    await this.prisma.films.update({
      where: {
        id: filmId,
      },
      data: {
        totalFavorites,
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

  async updateFilm(id: string, dto: UpdateFilmDto) {
    // Check if the film exists
    const film = await this.findById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if the data contains invalid fields
    const allowedFields = [
      'title',
      'synopsis',
      'genre',
      'poster',
      'trailer',
      'releaseDate',
      'finishDate',
    ];

    const invalidFields = Object.keys(dto).filter(
      (key) => !allowedFields.includes(key),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        'Invalid fields: ' + invalidFields.join(', '),
      );
    }

    // Convert the date strings to Date objects
    if (dto.releaseDate) dto.releaseDate = new Date(dto.releaseDate);
    if (dto.finishDate) dto.finishDate = new Date(dto.finishDate);

    // Update the film
    await this.prisma.films.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
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
        rating: 'desc',
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
