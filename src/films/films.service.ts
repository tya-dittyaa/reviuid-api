import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFilmDto, AddUserFilmReviuwDto, UpdateFilmDto } from './dto';

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

    return {
      film,
      userReviews: [],
    };
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

  async addFavoriteFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if user already added the film to favorites
    const existingFavorite = await this.prisma.userFilmFavorite.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (existingFavorite) {
      throw new BadRequestException('Film already added to favorites');
    }

    // Add the film to the user's favorite films
    await this.prisma.userFilmFavorite.create({
      data: {
        user_id: userId,
        film_id: filmId,
      },
    });
  }

  async removeFavoriteFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if the user added the film to favorites
    const existingFavorite = await this.prisma.userFilmFavorite.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (!existingFavorite) {
      throw new BadRequestException('Film not added to favorites');
    }

    // Remove the film from the user's favorite films
    await this.prisma.userFilmFavorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
  }

  async addWatchlistFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if user already added the film to watchlist
    const existingWatchlist = await this.prisma.userFilmWatchlist.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (existingWatchlist) {
      throw new BadRequestException('Film already added to watchlist');
    }

    // Add the film to the user's watchlist
    await this.prisma.userFilmWatchlist.create({
      data: {
        user_id: userId,
        film_id: filmId,
      },
    });
  }

  async removeWatchlistFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if the user added the film to watchlist
    const existingWatchlist = await this.prisma.userFilmWatchlist.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (!existingWatchlist) {
      throw new BadRequestException('Film not added to watchlist');
    }

    // Remove the film from the user's watchlist
    await this.prisma.userFilmWatchlist.delete({
      where: {
        id: existingWatchlist.id,
      },
    });
  }

  async addFilmReview(
    userId: string,
    filmId: string,
    dto: AddUserFilmReviuwDto,
  ) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if the user added review to the film
    const existingReview = await this.prisma.userFilmReview.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (existingReview) {
      throw new BadRequestException('Review already added');
    }

    // Check if the rating is floating point
    if (!Number.isInteger(dto.rating)) {
      throw new BadRequestException('Rating must be an integer');
    }

    // Check if the rating is between 1 and 5
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Add the review to the film
    await this.prisma.userFilmReview.create({
      data: {
        user_id: userId,
        film_id: filmId,
        rating: dto.rating,
        review: dto.review,
      },
    });
  }

  async removeFilmReview(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.findById(filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if the user added review to the film
    const existingReview = await this.prisma.userFilmReview.findFirst({
      where: {
        user_id: userId,
        film_id: filmId,
      },
    });
    if (!existingReview) {
      throw new BadRequestException('Review not found');
    }

    // Remove the review from the film
    await this.prisma.userFilmReview.delete({
      where: {
        id: existingReview.id,
      },
    });
  }
}
