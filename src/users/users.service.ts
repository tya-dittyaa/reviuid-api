import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomBytes, scryptSync } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: data.username }, { email: data.email }] },
    });

    if (user) throw new ConflictException('username or email already exists');

    data.password = this.encryptPassword(data.password);
    await this.prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  private encryptPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }
}
