import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { google } from 'googleapis';
import { join } from 'path';
import { FilmsService } from 'src/films/films.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassThrough } from 'stream';
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

  async delete(userId: string) {
    try {
      // Get all favorites by user
      const favorite = await this.prisma.userFilmFavorite.findMany({
        where: {
          user_id: userId,
        },
      });

      // Remove all favorites
      if (favorite.length > 0) {
        for (const f of favorite) {
          await this.removeFavoriteFilm(userId, f.film_id);
        }
      }

      // Get all watchlist by user
      const watchlist = await this.prisma.userFilmWatchlist.findMany({
        where: {
          user_id: userId,
        },
      });

      // Remove all watchlist
      if (watchlist.length > 0) {
        for (const w of watchlist) {
          await this.removeWatchlistFilm(userId, w.film_id);
        }
      }

      // Get all reviews by user
      const review = await this.prisma.userFilmReview.findMany({
        where: {
          user_id: userId,
        },
      });

      // Remove all reviews
      if (review.length > 0) {
        for (const r of review) {
          await this.removeFilmReview(userId, r.film_id);
        }
      }

      // Remove all forum children by user
      await this.prisma.forumChild.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Remove all forum parents by user
      await this.prisma.forumParent.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Remove all report to user
      await this.prisma.userReport.deleteMany({
        where: {
          user_id: userId,
        },
      });

      // Delete the user
      await this.prisma.users.delete({
        where: {
          id: userId,
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Failed to delete user');
    }
  }

  async getProfile(username: string) {
    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      biography: user.biography,
      avatar: user.avatar,
    };
  }

  async getFavoriteTotals(username: string) {
    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all favorites by user
    const favorites = await this.prisma.userFilmFavorite.count({
      where: {
        user_id: user.id,
      },
    });

    return favorites;
  }

  async getWatchlistTotals(username: string) {
    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all watchlist by user
    const watchlist = await this.prisma.userFilmWatchlist.count({
      where: {
        user_id: user.id,
      },
    });

    return watchlist;
  }

  async getFavoriteFilms(username: string, page: number) {
    //
    if (isNaN(page)) {
      throw new BadRequestException('Invalid page number');
    }

    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all favorites by user
    const favorites = await this.prisma.userFilmFavorite.findMany({
      where: {
        user_id: user.id,
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
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

    return favorites.map((favorite) => favorite.film);
  }

  async getWatchlistFilms(username: string, page: number) {
    //
    if (isNaN(page)) {
      throw new BadRequestException('Invalid page number');
    }

    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get all watchlist by user
    const watchlist = await this.prisma.userFilmWatchlist.findMany({
      where: {
        user_id: user.id,
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        createdAt: 'desc',
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

    return watchlist.map((watch) => watch.film);
  }

  async checkUsername(username: string) {
    // Check if the username is already taken
    const existingUser = await this.findByUsername(username);
    return existingUser ? true : false;
  }

  async checkEmail(email: string) {
    // Check if the email is already taken
    const existingEmail = await this.findByEmail(email);
    return existingEmail ? true : false;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    // Check if the user exists
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
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

    // Hash the password
    if (dto.password) {
      const hashPassword = await hash(dto.password);
      dto.password = hashPassword;
    }

    // Update the user
    await this.update(userId, dto);
  }

  async updateAvatar(userId: string, avatar: Express.Multer.File) {
    // Check if the user exists
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if no avatar is uploaded
    if (!avatar) {
      throw new BadRequestException('No avatar uploaded');
    }

    // Check if the avatar is an image
    if (!avatar.mimetype.startsWith('image')) {
      throw new BadRequestException('Avatar must be an image');
    }

    // Google drive configuration
    const KEYFILEPATH = join(__dirname, '../../gdrive.credentials.json');
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    const PARENTFOLDER = '1zS9aZeHM8xc93rzTm1iwVi-4nnvCmrIf';

    // Google Auth
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
    });

    // Buffer stream
    const bufferStream = new PassThrough();
    bufferStream.end(avatar.buffer);

    // Google Drive client
    const drive = google.drive({
      version: 'v3',
      auth,
    });

    // Remove old avatar file with the same name as userId
    const existingFiles = await drive.files.list({
      q: `name='${userId}'`,
    });

    if (existingFiles.data.files.length > 0) {
      const fileId = existingFiles.data.files[0].id;
      await drive.files.delete({
        fileId,
      });
    }

    // Upload avatar to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: userId,
        mimeType: avatar.mimetype,
        parents: [PARENTFOLDER],
      },
      media: {
        mimeType: avatar.mimetype,
        body: bufferStream,
      },
    });

    // Update avatar on database
    const avatarUrl = `https://lh3.googleusercontent.com/d/${response.data.id}`;
    await this.update(userId, { avatar: avatarUrl });
  }

  async deleteProfile(userId: string) {
    // Check if the user exists
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the user
    await this.delete(userId);
  }

  async deleteAvatar(userId: string) {
    // Check if the user exists
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the avatar
    const defaultAvatar =
      'https://lh3.googleusercontent.com/d/1yhM-tDrQwh166RGAqTGzLKPvVri7jAKD';
    await this.update(userId, { avatar: defaultAvatar });
  }

  async checkFavoriteFilm(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

    return existingFavorite ? true : false;
  }

  async addFavoriteFilm(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

  async checkWatchlistFilm(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

    return existingWatchlist ? true : false;
  }

  async addWatchlistFilm(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

  async getFilmReview(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

    return existingReview;
  }

  async addFilmReview(userId: string, filmId: string, dto: AddFilmReviewDto) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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
        review: dto.review,
        rating: dto.rating,
      },
    });

    // Calculate the total rating for the film
    await this.filmsService.calculateTotalRating(filmId);
  }

  async updateFilmReview(
    userId: string,
    filmId: string,
    dto: AddFilmReviewDto,
  ) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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

    // Check if the rating is floating point
    if (!Number.isInteger(dto.rating)) {
      throw new BadRequestException('Rating must be an integer');
    }

    // Check if the rating is between 1 and 5
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Update the review to the film
    await this.prisma.userFilmReview.update({
      where: {
        id: existingReview.id,
      },
      data: {
        review: dto.review,
        rating: dto.rating,
      },
    });

    // Calculate the total rating for the film
    await this.filmsService.calculateTotalRating(filmId);
  }

  async removeFilmReview(userId: string, filmId: string) {
    // Check if the film ID is provided
    if (!filmId) {
      throw new BadRequestException('Film ID is required');
    }

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
