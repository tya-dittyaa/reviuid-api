import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async getTokenFromDatabase(userId: string) {
    return this.prisma.userLoginToken.findUnique({
      where: { userId, expired: { gte: new Date() } },
    });
  }

  async verifyToken(token: string): Promise<boolean> {
    const foundToken = await this.prisma.userLoginToken.findFirst({
      where: { token, expired: { gte: new Date() } },
    });
    return !!foundToken;
  }

  async addTokenToDatabase(userId: string, token: string) {
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
