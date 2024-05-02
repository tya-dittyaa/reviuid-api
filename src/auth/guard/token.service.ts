import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async getToken(userId: string) {
    return this.prisma.userLoginToken.findUnique({
      where: { userId, expired: { gte: new Date() } },
      select: { token: true },
    });
  }

  async getUser(token: string) {
    return this.prisma.userLoginToken.findFirst({
      where: { token, expired: { gte: new Date() } },
      select: { userId: true },
    });
  }

  async verifyToken(token: string) {
    const foundToken = await this.prisma.userLoginToken.findFirst({
      where: { token, expired: { gte: new Date() } },
    });
    return !!foundToken;
  }

  async addToken(userId: string, token: string) {
    const expired = this.generateExpirationDate();
    await this.prisma.userLoginToken.upsert({
      where: { userId },
      update: { token, expired },
      create: { userId, token, expired },
    });
  }

  async deleteTokenFromDatabase(userId: string) {
    await this.prisma.userLoginToken.delete({ where: { userId } });
  }

  private generateExpirationDate() {
    return new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  }
}
