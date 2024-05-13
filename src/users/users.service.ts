import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilmsService } from 'src/films/films.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddFavoriteFilmDto, AddWatchlistFilmDto, UpdateUserDto } from './dto';

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
    const user = await this.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      username: user.username,
      biography: user.biography,
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

  async addFavoriteFilm(userId: string, dto: AddFavoriteFilmDto) {
    // Check if the film exists
    const film = await this.filmsService.findById(dto.filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if user already added the film to favorites
    const existingFavorite = await this.prisma.userFilmFavorite.findFirst({
      where: {
        user_id: userId,
        film_id: dto.filmId,
      },
    });
    if (existingFavorite) {
      throw new BadRequestException('Film already added to favorites');
    }

    // Add the film to the user's favorite films
    await this.prisma.userFilmFavorite.create({
      data: {
        user_id: userId,
        film_id: dto.filmId,
      },
    });
  }

  async addWatchlistFilm(userId: string, dto: AddWatchlistFilmDto) {
    // Check if the film exists
    const film = await this.filmsService.findById(dto.filmId);
    if (!film) {
      throw new NotFoundException('Film not found');
    }

    // Check if user already added the film to watchlist
    const existingWatchlist = await this.prisma.userFilmWatchlist.findFirst({
      where: {
        user_id: userId,
        film_id: dto.filmId,
      },
    });
    if (existingWatchlist) {
      throw new BadRequestException('Film already added to watchlist');
    }

    // Add the film to the user's watchlist
    await this.prisma.userFilmWatchlist.create({
      data: {
        user_id: userId,
        film_id: dto.filmId,
      },
    });
  }
}
