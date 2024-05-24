import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    return this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }

  async getProfile(username: string) {
    // Search for users by username
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      username: user.username,
      biography: user.biography,
      avatar: user.avatar,
    };
  }

  async getFavoriteFilms(username: string) {
    // Check if the user exists
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get the user's favorite films
    const favoriteFilms = await this.prisma.userFilmFavorite.findMany({
      where: {
        user_id: user.id,
      },
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

    return favoriteFilms.map((favorite) => favorite.film);
  }

  async getWatchlistFilms(username: string) {
    // Check if the user exists
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get the user's watchlist films
    const watchlistFilms = await this.prisma.userFilmWatchlist.findMany({
      where: {
        user_id: user.id,
      },
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

    return watchlistFilms.map((watchlist) => watchlist.film);
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
    const avatarUrl = `https://drive.google.com/uc?export=view&id=${response.data.id}`;
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
      'https://lh3.google.com/u/0/d/1yhM-tDrQwh166RGAqTGzLKPvVri7jAKD';
    await this.update(userId, { avatar: defaultAvatar });
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
