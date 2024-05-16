import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilmsService } from 'src/films/films.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFilmReviewDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filmsService: FilmsService,
  ) {}

  async create(dto: Prisma.UsersCreateInput) {
    return this.prisma.users.create({
      data: dto,
    });
  }

  async findById(id: string) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: {
        username,
      },
    });
  }

  async update(userId: string, data: Prisma.UsersUpdateInput) {
    return this.prisma.users.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  async displayProfile(username: string) {
    // Check if the user exists
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get user film favorites list
    const favorites = await this.prisma.userFilmFavorite.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        film: {
          select: {
            id: true,
            title: true,
            poster: true,
          },
        },
      },
    });

    // Get user film watchlist
    const watchlist = await this.prisma.userFilmWatchlist.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        film: {
          select: {
            id: true,
            title: true,
            poster: true,
          },
        },
      },
    });

    return {
      username: user.username,
      biography: user.biography,
      favoritesFilm: favorites,
      watchlistFilm: watchlist,
    };
  }

  async updateProfile(userId: string, username: string, dto: UpdateUserDto) {
    // Check if the user exists
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this user');
    }

    // Check if the data contains invalid fields
    const allowedFields = ['email', 'password', 'username', 'biography'];

    const invalidFields = Object.keys(dto).filter(
      (key) => !allowedFields.includes(key),
    );

    if (invalidFields.length > 0) {
      throw new BadRequestException(
        'Invalid fields: ' + invalidFields.join(', '),
      );
    }

    // Check if the username is already taken
    if (dto.username) {
      const existingUser = await this.findByUsername(dto.username);
      if (existingUser) {
        throw new BadRequestException('Username already taken');
      }
    }

    // Check if the email is already taken
    if (dto.email) {
      const existingEmail = await this.findByEmail(dto.email);
      if (existingEmail) {
        throw new BadRequestException('Email already taken');
      }
    }

    // Update the user
    await this.update(userId, dto);
  }

  async deleteProfile(userId: string, username: string) {
    // Check if the user exists
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this user');
    }

    // Delete the user
    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }

  async addFavoriteFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.filmsService.findById(filmId);
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

    // Calculate the total favorites for the film
    await this.filmsService.calculateTotalFavorites(filmId);
  }

  async removeFavoriteFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.filmsService.findById(filmId);
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

    // Calculate the total favorites for the film
    await this.filmsService.calculateTotalFavorites(filmId);
  }

  async addWatchlistFilm(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.filmsService.findById(filmId);
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
    const film = await this.filmsService.findById(filmId);
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

  async addFilmReview(userId: string, filmId: string, dto: AddFilmReviewDto) {
    // Check if the film exists
    const film = await this.filmsService.findById(filmId);
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

    // Calculate the total rating for the film
    await this.filmsService.calculateTotalRating(filmId);
  }

  async removeFilmReview(userId: string, filmId: string) {
    // Check if the film exists
    const film = await this.filmsService.findById(filmId);
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

    // Calculate the total rating for the film
    await this.filmsService.calculateTotalRating(filmId);
  }
}
