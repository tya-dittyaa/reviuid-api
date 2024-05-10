import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SettingsDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        biography: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const extendedUser = {
      ...user,
      avatar: null,
    };

    return extendedUser;
  }

  async updateUserSettings(userId: string, dto: SettingsDto) {
    const email = dto.email ? dto.email : undefined;
    const password = dto.password ? await hash(dto.password) : undefined;
    const username = dto.username ? dto.username : undefined;
    const biography = dto.biography ? dto.biography : undefined;

    if (!email && !password && !username && !biography) {
      throw new NotFoundException('No settings provided');
    }

    if (email) {
      const userWithEmail = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithEmail) {
        throw new NotFoundException('Email already in use');
      }
    }

    if (username) {
      const userWithUsername = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (userWithUsername) {
        throw new NotFoundException('Username already in use');
      }
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        password,
        username,
        biography,
      },
    });
  }
}
